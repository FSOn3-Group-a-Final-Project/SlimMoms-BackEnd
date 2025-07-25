import Product from "../db/models/product.js";
import DiaryEntry from '../db/models/diaryEntry.js';





// TEST ÜRÜNÜ EKLEME - BİR KERELİK


const insertTestProductIfEmpty = async () => {
  const existing = await Product.findOne({ title: "Pirinç" });
  if (!existing) {
    const created = await Product.create({
      categories: 'grain',
      weight: 100,
      title: 'Pirinç',
      calories: 360,
      groupBloodNotAllowed: [false, true, false, true],
    });
    console.log("🟢 Test ürünü oluşturuldu:", created._id.toString());
  } else {
    console.log("🟡 'Pirinç' ürünü zaten mevcut:", existing._id.toString());
  }
};
// TEST ÜRÜNÜ EKLEME - BİR KERELİK






export const getFilteredProducts = async (req,res) => {
    try {
        const {search} = req.query;
        let products;
        if(search){
            //search paramateresi varsa title a göre filtrele (case-insensitive) RegExp,  metin arama ve eşleştirme işlemleri yapmak için
            const regex = new RegExp(search,'i'); // i -> case insensitive (küçük-büyük harf farkı olmadan arama yapılması için)
            products = await Product.find({title:{$regex:regex}});
        }else {
            // parametre yoksa tüm ürünleri getir
            products= await Product.find();
        }
         res.status(200).json(products);
    } catch (error) {
        console.error('Ürün arama hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
    }
};



export const addProductToDiary = async (req, res) => {
  try {


     // ⬇GEÇİCİ: test ürünü ekleme (sadece ilk çalıştırmada)
    await insertTestProductIfEmpty();


    const userId = req.user.id;
    const { productId, date, weight } = req.body;

    //test için
    let product;
try {
  product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Ürün bulunamadı!' });
} catch (err) {
  return res.status(400).json({ message: 'Geçersiz ürün ID' });
}
// test biten kod


    // const product = await Product.findById(productId);
    // if (!product) return res.status(404).json({ message: 'Ürün bulunamadı!' });

    let diary = await DiaryEntry.findOne({ user: userId, date });

    if (!diary) {
      diary = new DiaryEntry({
        user: userId,
        date,
        products: [{ product: productId, weight }],
      });
    } else {
      diary.products.push({ product: productId, weight });
    }

    await diary.save();

    const addedProductDetails = await Product.findById(productId);

    res.status(200).json({
        message: "Ürün başarı ile eklendi",
        addedProduct: {
          details: addedProductDetails,
          weight: weight
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const removeProductFromDiary = async (req, res) => {
  try {
    const { date, productId } = req.params;
    const userId = req.user.id;

    const diary = await DiaryEntry.findOne({ user: userId, date });
    if (!diary) {
      return res.status(404).json({ message: 'Günlük kaydı bulunamadı' });
    }

    const productToDelete = diary.products.find(
      (item) => item.product.toString() === productId,
    );

    if (!productToDelete) {
      return res.status(404).json({ message: 'Günlükte bu ürün bulunamadı' });
    }

    const deletedProductDetails = await Product.findById(productToDelete.product);

    diary.products = diary.products.filter(
      (item) => item.product.toString() !== productId,
    );

    await diary.save();

    res.status(200).json({ message: 'Ürün silindi', deletedProduct: deletedProductDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const getDiaryByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user.id;

    const diary = await DiaryEntry.findOne({ user: userId, date }).populate(
      'products.product',
    ); // ürün detayları

    if (!diary) {
      return res.status(404).json({ message: 'Günlük bulunamadı' });
    }

    res.status(200).json(diary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const getAllDiaryProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const diaries = await DiaryEntry.find({ user: userId }).populate('products.product');

    if (!diaries || diaries.length === 0) {
      return res.status(200).json([]);
    }

    const allProducts = diaries.flatMap(diary =>
      diary.products.map(entry => ({
        date: diary.date,
        ...entry.toObject(),
      }))
    );

    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

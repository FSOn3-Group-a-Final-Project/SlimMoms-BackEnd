import DiaryEntry from '../db/models/diaryEntry.js';
import Product from '../db/models/product.js';

export const addProductToDiary = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user.id; 
    const { productId, weight } = req.body;
    
    // ürün kontrolü
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Ürün bulunamadı!' });

    // kullanıcının belirtilen tarihte günlük kaydı var mı 
    let diary = await DiaryEntry.findOne({ user: userId, date });

    if (!diary) {
      // Yoksa yeni oluştur
      diary = new DiaryEntry({
        user: userId,
        date,
        products: [{ product: productId, weight: weight || 100 }]
      });
    } else {
      // Varsa ürünleri ekle
      diary.products.push({ product: productId, weight: weight || 100 });
    }

    await diary.save();
    res.status(200).json({message: "Ürün başarıyla eklendi!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};
import DiaryEntry from '../db/models/diaryEntry.js';
import Product from '../db/models/product.js';

export const addProductToDiary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, date, weight } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Ürün bulunamadı!' });

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
    res.status(200).json({message: "Ürün başarı ile eklendi"},diary);
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

    // ürün listeden siliniyor
    diary.products = diary.products.filter(
      (item) => item.product.toString() !== productId,
    );

    await diary.save();
    res.status(200).json({ message: 'Ürün silindi', diary });
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

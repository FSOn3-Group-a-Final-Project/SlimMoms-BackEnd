import Product from '../db/models/product.js';
import { UsersCollection } from '../db/models/user.js';
export const calculateCaloriesPublic = async (req, res) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

    //form eksik mi kontrol
    if (
      height === undefined ||
      age === undefined ||
      currentWeight === undefined ||
      desiredWeight === undefined ||
      bloodType === undefined
    ) {
      return res.status(400).json({ message: 'Eksik alanlar var' });
    }

    //kalori hesaplama - kadınlar için

    const dailyCalories = Math.round(
      10 * currentWeight +
        6.25 * height -
        5 * age -
        161 -
        10 * (currentWeight - desiredWeight),
    );

    //Kan grubuna göre yasaklı ürünü bulma
    const allProducts = await Product.find();
    const notAllowedProducts = allProducts.filter(
      (product) => product.groupBloodNotAllowed[bloodType], // Boolean diziden kan grubuna göre yasak mı kontrol ediyor
    );
    res.json({
      dailyCalories,
      notAllowedProducts,
    });
  } catch (error) {
    console.error('calculateCaloriesPublic HATASI:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

export const calculateCaloriesPrivate = async (req, res) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

    // Eksik alan kontrolü
    if (
      height === undefined ||
      age === undefined ||
      currentWeight === undefined ||
      desiredWeight === undefined ||
      bloodType === undefined
    ) {
      return res.status(400).json({ message: 'Eksik alanlar var' });
    }

    // Kalori hesaplama (kadınlar için formül)
    const dailyCalories = Math.round(
      10 * currentWeight +
        6.25 * height -
        5 * age -
        161 -
        10 * (currentWeight - desiredWeight),
    );

    // Ürünleri çek
    const allProducts = await Product.find();

    // Kan grubuna göre yasaklı ürünleri filtrele
    const notAllowedProducts = allProducts.filter(
      (product) => product.groupBloodNotAllowed[bloodType],
    );

    // Veritabanına kullanıcıya kaydet

    const user = await UsersCollection.findById(req.user._id);
    user.dailyCalories = dailyCalories;
    user.notAllowedProducts = notAllowedProducts.map((p) => p._id); // veya p.title
    await user.save();

    // Cevap gönder
    res.status(200).json({
      dailyCalories,
      notAllowedProducts,
    });
  } catch (error) {
    console.error('calculateCaloriesPrivate HATASI:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

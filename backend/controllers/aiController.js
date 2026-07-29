exports.classifyWaste = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Image required",
      });
    }

    // Demo Classification
    res.status(200).json({
      message: "Waste classified successfully",
      image: req.file.filename,
      category: "Metal",
      confidence: 99,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
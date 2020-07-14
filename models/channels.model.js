module.exports = mongoose => {
  const Channel = mongoose.model(
    "channel",
    mongoose.Schema(
      {
        title: String,
        description: String,
      },
      { timestamps: true }
    )
  );

  return Channel;
};
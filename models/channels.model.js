module.exports = mongoose => {
  
  const Channel = mongoose.model(
    "channel",
    mongoose.Schema(
      {
        title: String,
        short_title: String,
        description: String,
        channel_id: String,
        media: {
          url: String,
          channelId: String,
        }
      },
      { timestamps: true }
    )
  );

  return Channel;
};
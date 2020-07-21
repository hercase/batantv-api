module.exports = mongoose => {
  
  const Preview = mongoose.model(
    "preview",
    mongoose.Schema(
      {
        videoId: String,
        publishedAt: String,
        channelId: String,
        title: String,
        description: String,
        publishTime: String,
        thumbnails: {
            default: {
                url: String,
                width: Number,
                height: Number
            },
            medium: {
                url: String,
                width: Number,
                height: Number
            },
            high: {
                url: String,
                width: Number,
                height: Number
            }
        }
      }
    ), 'previews'
  );

  return Preview;
};
const axios = require('axios').default;
const db = require("../models");
const Channel = db.channels;

const formatResponses = (object) => {
  let newFormat = [];

  object.items.forEach(video => {
    const { id, snippet } = video;

    let formatedVideoData = {
      "videoId": id.videoId,
      "publishedAt": snippet.publishedAt,
      "channelId": snippet.channelId,
      "title": snippet.title,
      "description": snippet.description,
      "thumbnails": snippet.thumbnails,
    }

    newFormat.push(formatedVideoData);
  })

  return newFormat;
};

const getChannelsIDs = ( random , res) => {

  Channel.find({})
  .then(data => {
    let transformedResponse = JSON.stringify(data);    
    let channels_ids = JSON.parse(transformedResponse).map(item => item.media.youtube_id);
    res.send(channels_ids) 

  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving channels."
    });
  });
};

const updatePreview = () => {
  
}


exports.updatePreview2 = (channel_id, res) => {

  const key = 'AIzaSyAxgOxgraVNuvTyYdz9iy3E6DDLbOwEZwo';

  const config = {
    params: {
      key,
      channelId: channel_id,
      part: 'snippet',
      order: 'date',
      maxResults: '8',
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
    axios.get('https://www.googleapis.com/youtube/v3/search', config)
      .then(resp => {
        res.send(formatResponses(resp.data))
      })
      .catch(err => res.send(err))
};



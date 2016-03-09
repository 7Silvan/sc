function setScreenshotUrl(url) {
  document.getElementById('target').src = url;
}

function submitImage() {
  var image = document.getElementById('target').src;
  image = image.replace('data:image/jpeg;base64,', '');
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  $.ajax({
    url: 'https://api.imgur.com/3/image',
    type: 'POST',
    data: {
      type: 'base64',
      image: image,
      title: title,
      descritpion: description
    },
    headers: {'Authorization': 'CLIENT-ID 97a039f52b96940'},
  }).done(function (response) {
    if ((response.status === 200) && (response.success === true)) {
      // https://api.imgur.com/models/image
      // (l = 640x640, m = 320x320, t = 160x160)
      var fullsizeLink = response.data.link,
      thumbLink = fullsizeLink.substr(0, fullsizeLink.lastIndexOf(".")) +
        'm' +
        fullsizeLink.substr(fullsizeLink.lastIndexOf("."), fullsizeLink.length);
      $('#resultLink').attr('href', fullsizeLink).text(fullsizeLink);
    } else {
      alert('Host error (status code ' + response.status + ')');
    }
  }).fail(function (response) {
    alert('Error while image upload \n' + JSON.stringify(response));
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    title: 'Default title',
    description: 'Default description'
  }, function (item) {
    document.getElementById('title').value = item.title;
    document.getElementById('description').value = item.description;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('submit').addEventListener('click', submitImage);
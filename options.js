// Saves options to chrome.storage
function saveOptions() {
  var title = document.getElementById('title').value;
  var description = document.getElementById('description').value;
  chrome.storage.sync.set({
    title: title,
    description: description
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    title: 'Default title',
    description: 'Default description'
  }, function(item) {
    document.getElementById('title').value = item.title;
    document.getElementById('description').value = item.description;
  });
}

function setDefaultOptions() {
  chrome.storage.sync.set({
    title: 'Default title',
    description: 'Default description'
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options restored to default values and saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  restoreOptions();
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', setDefaultOptions);

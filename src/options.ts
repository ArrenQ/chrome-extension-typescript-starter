


(function () {

  // Saves options to chrome.storage.sync.
  function save_options() {
    // @ts-ignore
    var username = document.getElementById("username").value;
    // @ts-ignore
    var password = document.getElementById("password").value;
    // @ts-ignore
    var server = document.getElementById("server").value;

    localStorage['settings'] = JSON.stringify({
      username : username,
      password: password,
      server: server
    });

    let status = document.getElementById("status");
    status.innerText = 'Options saved.';
    setTimeout(function() {
      status.innerText = '';
    }, 750);

  }
  // @ts-ignore
  document.getElementById('save').addEventListener("click", save_options);

  // chrome.storage.sync.get({
  //   username: '',
  //   password: '',
  //   server: ''
  // }, function(items: {username, password, server}) {
  //   // @ts-ignore
  //   document.getElementById("username").value = items.username;
  //   // @ts-ignore
  //   document.getElementById("password").value = items.password;
  //   // @ts-ignore
  //   document.getElementById("server").value = items.server;
  // });

  let settingstr = localStorage['settings'];
  if(settingstr) {
    let setting = JSON.parse(settingstr);
    // @ts-ignore
    document.getElementById("username").value = setting.username;
    // @ts-ignore
    document.getElementById("password").value = setting.password;
    // @ts-ignore
    document.getElementById("server").value = setting.server;
  }
})();


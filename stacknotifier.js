// ==UserScript==
// @name        StackNotifier
// @namespace   https://github.com/reski78/StackNotifier
// @version     1.0
// @author      reski78
// @match       *://stackoverflow.com/*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

(async () => {
  const CONFIG = {
    /* You can change these properties: */

    //time period in miliseconds after which notification will disappear
    DISAPPEAR_MS: 8000,

    //text which will be prepended to title bar when browser tab gets unactive
    //string or false
    PREPEND_TITLE: '[Notifying]: '
  };

  const log = console.log.bind(console, 'StackNotifier:');

  const questions = document.querySelector('#questions');
  if(!questions)
    return;

  const isPageHidden = () => document.visibilityState === 'hidden';

  const forEach = fn => array => array.forEach(fn);

  //shows notification
  const notify = (title, msg = '') => {
    if(Notification.permission !== 'granted')
      return;

    const notification = new Notification(title, {
      body: msg,
      icon: 'https://i.imgur.com/wSigNGi.png'
    });

    notification.onclick = () => window.focus() || notification.close();

    setTimeout(
      () => notification.close(),
      CONFIG.DISAPPEAR_MS
    );
  };

  const checkPermissions = () =>
    new Promise((resolve, reject) => {
      if(Notification.permission === 'granted')
        return resolve();

      Notification.requestPermission()
      .then(
        permission => permission === 'granted' ? (resolve(), notify('StackNotifier', 'Hello there!')) : alert('StackNotifier won\'t work without enabled notifications!')
      )
    });

  //extracts title and content from question element
  const getTitleAndContent = question => {
    const title = question.querySelector('.summary > h3 > a'),
          content = question.querySelector('.summary > .excerpt');

    if(!title || !content)
      return [];

    return [
      title.innerText,
      content.innerText
    ];
  };

  const doSomethingWithQuestion = question => {
    const [ title, content ] = getTitleAndContent(question);

    if(!title || !content)
      return log('Error!\nCan\'t extract title or content from', question);

    notify(title, content);
  };

  const onMutation = ({ addedNodes }) => {
    const [ firstAdded ] = addedNodes;

    if(!firstAdded)
      return;

    if(firstAdded.classList.contains('new-post-activity'))
      firstAdded.click();
    else if(firstAdded.classList.contains('question-summary'))
      doSomethingWithQuestion(firstAdded);
  };

  const whenThen = condition => fn => arg =>
    condition() ? fn(arg) : arg;

  const observer = new MutationObserver(
    whenThen(
      isPageHidden
    )(
      forEach(onMutation)
    )
  );

  const options = {
    childList: true
  };

  observer.observe(questions, options);

  await checkPermissions();

  const tag = CONFIG.PREPEND_TITLE;
  const titleStartsWithTag = () => document.title.startsWith(tag);

  const onVisibilityChange = () => {
    if(isPageHidden()){
      if(!titleStartsWithTag())
        document.title = CONFIG.PREPEND_TITLE+document.title;
    }
    else if(titleStartsWithTag())
      document.title = document.title.replace(CONFIG.PREPEND_TITLE, '');
  };

  if(tag){
    onVisibilityChange();
    document.addEventListener('visibilitychange', onVisibilityChange);
  }

  log('Everything seems to be OK!');
})();
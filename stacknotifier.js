// ==UserScript==
// @name        StackNotifier
// @namespace   https://github.com/xout/StackNotifier
// @version     2.0
// @author      reski78
// @match       *://stackoverflow.com/questions/tagged/*
// @grant       none
// @run-at      document-idle
// ==/UserScript==

const NOTIFICATIONS_TIME_ALIVE = 10000
const NOTIFICATIONS_WITH_ICON = true
const NOTIFICATIONS_ICON = 'data:image/png;base64,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'

const PREPEND_PREFIX_TO_UNACTIVE_TAB_TITLE = true
const PREFIX = '[N]: '

const checkNotificationsPermissions = async () => {
  if(Notification.permission === 'granted')
    return true 
  
  return (await Notification.requestPermission()) === 'granted'
}

;(async () => {
  if(!await checkNotificationsPermissions()){
    console.warn(`StackNotifier won't work without enabled notifications!`)
    return 
  }

  const questionsContainer = document.querySelector('#questions')

  const isNewQuestionSummaryAlert = ({ element }) =>
    element.matches('.js-new-post-activity')

  const isQuestionSummary = ({ element }) =>
    element.matches('.question-summary')

  const getTitleFromQuestionSummary = ({ questionSummary }) =>
    questionSummary.querySelector('.summary > h3 > a').textContent

  const getContentFromQuestionSummary = ({ questionSummary }) => 
    questionSummary.querySelector('.summary > .excerpt').textContent.trim()

  const getTitleAndContentFromQuestionSummary = ({ questionSummary }) => {
    try {
      return {
        title: getTitleFromQuestionSummary({ questionSummary }),
        content: getContentFromQuestionSummary({ questionSummary })
      }
    } catch(error) {
      console.error(`StackNotifier: Can't extract data from .question-summary`)
      throw error
    }
  }

  const notifyNewQuestionSummary = ({ element: questionSummary }) => {
    const { title, content } = getTitleAndContentFromQuestionSummary({ questionSummary })
    
    const notification = new Notification(title, {
      body: content,
      ...(NOTIFICATIONS_WITH_ICON && { icon: NOTIFICATIONS_ICON })
    })
    notification.addEventListener('click', handleNotificationClick(notification))

    setTimeout(
      () => 
        notification.close(), 
      NOTIFICATIONS_TIME_ALIVE
    )
  }

  const handleNotificationClick = notification => () => {
    window.focus()
    notification.close()
  }

  const handleQuestionsMutation = mutation => {
    //question summary alert is removed and added after change
    if(!mutation.addedNodes.length)
      return 
    
    const [ element ] = mutation.addedNodes

    if(isQuestionSummary({ element })){
      if(!document.hidden)
        return
        
      notifyNewQuestionSummary({ element })
      return 
    }

    if(!isNewQuestionSummaryAlert({ element }))
      return 

    //click on question summary alert to expand new question summaries
    element.click()
  }
  
  const questionsObserver = new MutationObserver(
    mutations => mutations.forEach(handleQuestionsMutation)
  )
  questionsObserver.observe(questionsContainer, {
    childList: true
  })

  const handleVisibilityChange = () => {
    if(document.hidden){
      document.title = `${PREFIX} ${document.title}` 
      return 
    }
    document.title = document.title.replace(PREFIX, '')
  }

  if(PREPEND_PREFIX_TO_UNACTIVE_TAB_TITLE)
    document.addEventListener('visibilitychange', handleVisibilityChange)

  console.log('StackNotifier is running.')
})()

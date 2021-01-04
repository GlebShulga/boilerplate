import axios from 'axios'
import { ADD_ID } from './basket'
import { SET_CURRENT_RATE, GET_SORTED_GOODS } from './goods'

const GET_LOGS = 'POST_LOG_BASKET'
const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const initialState = {
  logBasket: 0,
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS: {
      const { list } = action
      return {
        ...state,
        list
      }
    }
    case ADD_ID: {
      const messageBasket = `${action.productTitle} was ${
        action.number > 0 ? 'added to the basket' : 'removed from basket'
      } ${+new Date()}`
      axios({
        method: 'post',
        url: '/api/v1/log',
        data: {
          log: messageBasket
        }
      })
      return {
        ...state,
        list: [...state.list, messageBasket]
      }
    }
    case SET_CURRENT_RATE: {
      const messageCurrency = `currency changed from ${action.current.previousCurrency} to ${
        action.current.symbol
      } ${+new Date()}`
      axios({
        method: 'post',
        url: '/api/v1/log',
        data: {
          log: messageCurrency
        }
      })
      return {
        ...state,
        list: [...state.list, messageCurrency]
      }
    }
    case ROUTER_LOCATION_CHANGE: {
      const messageUrl = `navigate to ${action.payload.location.pathname} ${+new Date()}`
      axios({
        method: 'post',
        url: '/api/v1/log',
        data: {
          log: messageUrl
        }
      })
      return {
        ...state,
        list: [...state.list, messageUrl]
      }
    }
    case GET_SORTED_GOODS: {
      const messageSort = `sort by ${action.sortType} ${+new Date()}`
      axios({
        method: 'post',
        url: '/api/v1/log',
        data: {
          log: messageSort
        }
      })
      return {
        ...state,
        list: [...state.list, messageSort]
      }
    }
    default:
      return state
  }
}

export function getLogs() {
  return (dispatch) => {
    axios('api/v1/log').then(({ data: list }) => dispatch({ type: GET_LOGS, list }))
  }
}

export function delLogs() {
  return (dispatch) => {
    axios.delete('api/v1/log').then(() => dispatch({ type: GET_LOGS, list: [] }))
  }
}

// Страница 3. Логи - /logs
// Каждое действие юзера должно быть записано на сервере и выведено в таблице логов
// Варианты действий

// change currency from ${currency1} to ${currency2} +
// add ${item-title} to the backet +
// remove ${item-title} from the backet +
// navigate to ${url} page +
// sort by ${title}
// time of action in utc format (+new Date()) +
// Если обновить страницу, то логи должны сохранится.
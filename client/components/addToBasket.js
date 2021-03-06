import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addId } from '../redux/reducers/basket'

const AddToBasket = ({ it, basketCount }) => {
  const dispatch = useDispatch()

  const onAdd = useCallback(() => {
    dispatch(addId(it.id, -1))
  }, [it.id])
  const onSubtract = useCallback(() => {
    dispatch(addId(it.id, 1))
  }, [it.id])

  return (
    <div className="flex flex-row border h-10 w-24 rounded-lg">
      <button
        type="button"
        className="font-semibold border-r bg-red-400 hover:bg-red-500 text-white border-gray-400 h-full w-20 flex rounded-l focus:outline-none cursor-pointer focus-within:bg-red-900"
        onClick={onAdd}
      >
        <span className="m-auto">-</span>
      </button>
      <div className="product__amout bg-white w-24 text-xs md:text-base flex items-center justify-center cursor-default">
        {basketCount}
      </div>
      <button
        type="button"
        className="font-semibold border-l bg-blue-400 hover:bg-blue-500 text-white border-gray-400 h-full w-20 flex rounded-r focus:outline-none cursor-pointer focus-within:bg-blue-900"
        onClick={onSubtract}
      >
        <span className="m-auto">+</span>
      </button>
    </div>
  )
}

AddToBasket.propTypes = {}

export default AddToBasket

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Tooltip } from 'antd'
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'
import { Actions } from '../../redux/reducers/cart'
import { useDispatch } from 'react-redux'
import DetailCategory from '../modal/DetailCategory'
import { useRouter } from 'next/router'
import { getLanguage } from '../../utils/laguage'

function Category(props) {
  const t = getLanguage()
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const { data } = props

  const [isVisible, setVisible] = useState(false)
  const openDetailCategory = () => {
    setVisible(true)
  }

  const closeModalDetail = () => {
    setVisible(false)
  }

  const onAddToCart = () => {
    const dataCart = {
      id: data.id,
      size: data.size[0] || null,
      color: data.color[0] || null,
      quantity: 1,
      itemQuantity: data.quantity || 1,
      name: data.name,
      price: data.price || 0
    }
    dispatch(Actions.addToCart(dataCart))
  }

  const onAddToCartDetail = (data) => {
    const dataCart = {
      id: data.id,
      size: data.size || null,
      color: data.color || null,
      itemQuantity: data.itemQuantity || 1,
      quantity: data.quantity || 1,
      name: data.name,
      price: data.price || 0
    }
    dispatch(Actions.addToCart(dataCart))
    closeModalDetail()
  }

  return (
    <>
      <div className="category-item">
        <DetailCategory
          isVisible={isVisible}
          onClose={closeModalDetail}
          data={data}
          onAddToCartDetail={onAddToCartDetail}
          locale={locale}
        />
        <div className="flex-align-center">
          <img
            src={data.image[0]}
            alt="Picture of the author"
            width={'100%'}
            style={{ height: 300, objectFit: 'cover' }}
            // style={{ aspectRatio: '1/1' }}
          />
        </div>

        <div className="category-action-hover">
          <div className="action-hover">
            <Tooltip title={t.DETAIL.addToCart} onClick={onAddToCart}>
              <Button
                style={{ backgroundColor: 'transparent' }}
                icon={<ShoppingCartOutlined style={{ color: '#fff' }} />}
                size={'large'}
              />
            </Tooltip>
            <Tooltip
              title={t.DETAIL.seeDetail}
              placement="bottom"
              onClick={openDetailCategory}
            >
              <Button
                style={{ backgroundColor: 'transparent', top: 10 }}
                icon={<SearchOutlined style={{ color: '#fff' }} />}
                size={'large'}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="fw-500 text-align-center mt-10 fs-16 ">
        <div className="g-color-black">
          {`${data.name[locale]} ${data.code && `(${data.code})`}`}
        </div>
        <div className="g-color-blue">
          {`${data.price} ${data.quantity && `(x${data.quantity})`}`} ZŁ
        </div>
      </div>
    </>
  )
}

export default Category

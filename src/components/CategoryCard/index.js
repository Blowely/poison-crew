import React, {useEffect} from "react";
import "./CategoryCard.scss";
import {useAppSelector} from "../../store";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useGetAccountQuery} from "../../store/accounts.store";
import {useAddOrderMutation} from "../../store/orders.store";
import {Image, Layout, notification} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import PhoneFooter from "../PhoneFooter/PhoneFooter";

function CategoryCard({selectedCategory, setSelectedCategory, subcategories, handleSubCategoryClick}) {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get('from');
  const token = localStorage.getItem('token');
  const gender = localStorage.getItem("gender") || "men";

  const cartItems = useAppSelector((state) => state.cart.items);
  const addresses = useAppSelector((state) => state.account.addresses);

  const {data: accountData, isLoadingAcc, error: accError} = useGetAccountQuery(token, {skip: cartItems.length && addresses.length});
  const [addOrder, {isLoading: isLoadingAddOrder, error}] = useAddOrderMutation({},{refetchOnMountOrArgChange: true});

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [])

  const onGoBackClick = () => {
    return setSelectedCategory(null);
  }

  const onOkHandler = async () => {
    try {
      if (!addresses.length && !accountData?.account?.addresses?.length) {
        notification.open({duration: 2, type: 'warning', message:'Не выбран адрес доставки'})
      }
      if (!cartItems.length) {
        notification.open({duration: 2, type: 'warning', message:'Товары не выбраны'})
      }

      const addOrderBody = {
        clientId: accountData?.account?._id,
        products: cartItems || [],
        address: addresses[0] || accountData?.account?.addresses[0] || {},
      }

      const res = await addOrder(addOrderBody);

      if (res.data.status === 'ok') {
        return notification.open({duration: 2, type: 'success', message:'Заказ успешно оформлен'})
      } else {
        notification.open({duration: 2, type: 'error', message:'Ошибка оформления заказа'})
      }

    } catch (e) {
      notification.open({duration: 2, type: 'error', message:'Ошибка оформления заказа'})
    }
  }

  const renderMenuItem = (item) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
          {item.img && (
              <Image
                  src={item.img}
                  width={24}
                  height={24}
                  preview={false}
                  style={{
                    marginRight: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px'
                  }}
              />
          )}
          <span>{item.label}</span>
        </div>
    );
  };

  return (
      <Layout>
        <div className="content-block-header">
          <LeftOutlined onClick={onGoBackClick} />
          {selectedCategory}
          <div style={{width:'19px'}}/>
        </div>
        {subcategories?.length &&
            <div className="content-block" style={{padding: 'unset', marginTop: '55px'}}>
              <div className="category-selector">
                <div className="categories">
                  {selectedCategory && subcategories?.map((subcategory) => (
                      <div key={subcategory?.id}>
                        <button
                            className={`category-button`}
                            onClick={() => handleSubCategoryClick(subcategory)}
                        >
                          {renderMenuItem(subcategory)}
                        </button>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        }

        <PhoneFooter tab="categories" />
      </Layout>
  );
}

export default CategoryCard;

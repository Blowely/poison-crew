import React, {useEffect} from "react";
import "./CategoryCard.scss";
import {useAppSelector} from "../../store";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useGetAccountQuery} from "../../store/accounts.store";
import {useAddOrderMutation} from "../../store/orders.store";
import {Layout, notification} from "antd";
import {LeftOutlined} from "@ant-design/icons";

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
                          {subcategory?.name}
                        </button>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        }

        <footer>
          <div onClick={() => navigate("/products")}>
            <img style={{height: '26px'}}
                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/1.%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F.png"
                 alt=""/>
          </div>
          <div onClick={() => navigate(`/${gender}-categories/`)}>
            <img style={{height: '26px'}}
                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/2.%D0%9A%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%B0%D0%BA%D1%82%D0%B8%D0%B2.png"
                 alt=""/>
          </div>
          <div onClick={() => navigate("/cart")}>
            <img style={{height: '26px'}}
                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/3.%D0%9A%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%B0.png"
                 alt=""/>
          </div>
          <div onClick={() => navigate("/favorites")}>
            <img style={{height: '26px'}}
                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/4.%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5.png"
                 alt=""/>
          </div>
          <div onClick={() => navigate("/profile")}>
            <img style={{height: '26px'}}
                 src="https://storage.yandexcloud.net/pc-mediafiles/icons/v2/5.%D0%9F%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8C.png"
                 alt=""/>
          </div>
        </footer>
      </Layout>
  );
}

export default CategoryCard;

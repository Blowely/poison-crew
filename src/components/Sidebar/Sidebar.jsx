import React, { useEffect } from "react";
import { Menu, Drawer, Image } from "antd";
import "./Sidebar.scss";
import { useNavigate } from "react-router-dom";
import { FILLED_CATEGORIES } from "../constants";

const Sidebar = ({ visible, setVisibleCategories, setOffset, setLoading }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [visible]);

    const onCategoryClick = ({ item }) => {
        const { props } = item;

        setOffset(0);
        setLoading(true);
        setVisibleCategories(false);
        navigate(`?category${props?.categoryLvl}Id=${props.id}`);
    };

    const renderMenuItem = (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '17px' }}>
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

    return (
        <div className="sidebar-container">
            <Drawer
                title="Каталог"
                placement="left"
                onClose={() => setVisibleCategories(false)}
                visible={visible}
                bodyStyle={{ overflowY: "auto", maxHeight: "100vh" }} // Даем возможность скроллить сайдбар
            >
                <Menu
                    mode="inline"
                    onClick={onCategoryClick}
                    items={FILLED_CATEGORIES.map(item => ({
                        ...item,
                        label: renderMenuItem(item),
                        children: item.children?.map(child => ({
                            ...child,
                            label: renderMenuItem(child),
                            children: child.children?.map(child => ({
                                ...child,
                                label: renderMenuItem(child),
                            }))
                        }))
                    }))}
                />
            </Drawer>
        </div>
    );
};

export default Sidebar;

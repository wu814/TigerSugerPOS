"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import CoffeeFlavored from './coffeeFlavored/CoffeeFlavored';
import FruityAndRefreshing from './fruityAndRefreshing/FruityAndRefreshing';
import SweetAndCreamy from './sweetAndCreamy/SweetAndCreamy';
import SeasonalDrinks from './seasonalDrinks/SeasonalDrinks';
import styles from './page.module.css';

export default function Home() {
  // State to manage which component to display
  const [selectedComponent, setSelectedComponent] = useState<string>('fruityAndRefreshing');

  const [cart, setCart] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  // Define the type for the Drink
  type Drink = {
    drink_name: string;
    price: number;
    // Add other properties as needed
  };

  // Function to add a drink to the cart
  const addToCart = (drink: any): void => {
    setCart([...cart, drink]);
    setOrderTotal((prevOrderTotal) => parseFloat((prevOrderTotal + Number(drink.price)).toFixed(2)));
  };

  // Function to handle component selection
  const handleComponentSelect = (component: string): void => {
    setSelectedComponent(component);
  };

  // Render the selected component
  const renderSelectedComponent = (): JSX.Element | null => {
    switch (selectedComponent) {
      case 'fruityAndRefreshing':
        return <FruityAndRefreshing addToCart={addToCart} />;
      case 'sweetAndCreamy':
        return <SweetAndCreamy addToCart={addToCart} />;
      case 'coffeeFlavored':
        return <CoffeeFlavored addToCart={addToCart} />;
      case 'seasonalDrinks':
        return <SeasonalDrinks addToCart={addToCart} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1>Cashier Page</h1>
        <Cart cart={cart} setParentCart={setCart} orderTotal={orderTotal} setOrderTotal={setOrderTotal} />
        <div className={styles.container}>
          <div className={styles.pContainer}>
            <button className={styles.pItem} onClick={() => handleComponentSelect('fruityAndRefreshing')}>
              Fruity and Refreshing
            </button>
            <button className={styles.pItem} onClick={() => handleComponentSelect('sweetAndCreamy')}>
              Sweet and Creamy
            </button>
            <button className={styles.pItem} onClick={() => handleComponentSelect('coffeeFlavored')}>
              Coffee Flavored
            </button>
            <button className={styles.pItem} onClick={() => handleComponentSelect('seasonalDrinks')}>
              Seasonal Drinks
            </button>
          </div>
        </div>
        {renderSelectedComponent()}
      </div>
      <Footer />
    </>
  );
}

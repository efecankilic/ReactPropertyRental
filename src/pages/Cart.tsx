import React, { useEffect, useState } from "react";

const Cart = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  useEffect(() => {
    // Retrieve the selected property from localStorage
    const storedProperty = localStorage.getItem("cartProperty");
    if (storedProperty) {
      const property = JSON.parse(storedProperty);
      setSelectedProperty(property);
    }
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      {selectedProperty ? (
        <div>
          <h3>Selected Property:</h3>
          <p>Title: {selectedProperty.title}</p>
          <p>City: {selectedProperty.city}</p>
          <p>Street: {selectedProperty.street}</p>
          {/* Render other property details as needed */}
        </div>
      ) : (
        <p>No property in the cart</p>
      )}
    </div>
  );
};

export default Cart;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import firebaseApi from "../../api/firebaseApi";
import "./styles.css";

const Plans = () => {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState({});
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    firebaseApi.db
      .collection("products")
      .where("active", "==", true)
      .get()
      .then((productsSnapshot) => {
        const productsData = {};
        productsSnapshot.forEach(async (productDoc) => {
          productsData[productDoc.id] = productDoc.data();

          const priceSnapshot = await productDoc.ref.collection("prices").get();
          priceSnapshot.docs.forEach((priceDoc) => {
            productsData[productDoc.id].prices = {
              priceId: priceDoc.id,
              priceData: priceDoc.data(),
            };
          });
        });
        setProducts(productsData);
      });
  }, []);

  useEffect(() => {
    firebaseApi.db
      .collection("customers")
      .doc(user.id)
      .collection("subscriptions")
      .get()
      .then((subscriptionSnapshot) => {
        subscriptionSnapshot.forEach(async (subscription) => {
          const { role, current_period_end, current_period_start } =
            subscription.data();
          setSubscription({
            role,
            current_period_end: current_period_end.seconds,
            current_period_start: current_period_start.seconds,
          });
        });
      });
  }, [user.id]);

  const loadCheckout = async (priceId) => {
    console.log(priceId);
    const docRef = await firebaseApi.db
      .collection("customers")
      .doc(user.id)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { sessionId, error } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        // initialize stripe
        const stripe = await loadStripe(
          "pk_test_51NMGZMLqZuFCrL10VbURGyY6Zukwfia7iKevL89OjMOZ6U3yBdpCS9kAcQl2MpQDzkXZpccf4MYVVmcDCu0AI8ka00QmIIlBgc"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plans">
      {subscription && (
        <p>
          <br />
          Renewal Date:{" "}
          {new Date(
            subscription.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            className={`${
              isCurrentPackage && "plans__plan--disabled"
            } plans__plan`}
            key={productId}
          >
            <div className="plans__info">
              <h4>{productData?.name}</h4>
              <h5>{productData?.description}</h5>
            </div>

            <button
              disabled={isCurrentPackage}
              onClick={() => loadCheckout(productData?.prices?.priceId)}
            >
              {isCurrentPackage ? "Current Package" : "Subscripe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;

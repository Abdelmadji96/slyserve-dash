import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const checkRecaptchaToken = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "No reCaptcha " });
  } else {
    try {
      const response = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          body:
            "secret=" + process.env.reCaptchaSecretKey + "&response=" + token,
        }
      );
      const responseJson = await response.json();
      console.log(JSON.stringify(responseJson));
      if (responseJson["success"]) {
        next();
      } else {
        return res.status(403).json({ message: "Recaptcha invalide" });
      }
      // const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.reCaptchaSecretKey}&response=${token}`;
      // const { data } = await axios.get(googleVerifyUrl);
      // if (data.success) {
      //   next();
      // } else {
      //   return res.status(403).json({ message: "Invalid recaptcha" });
      // }
    } catch (error) {
      return res.status(403).json({ error });
    }
  }
};

export const registerOrder = async (req, res) => {
  const order = req.body;

  const url = `https://test.satim.dz/payment/rest/register.do?currency=012&amount=${order.amount}&language=EN&orderNumber=${order.orderNumber}&userName=SAT2109010233&password=satim120&returnUrl=${order.returnUrl}&jsonParams={%22force_terminal_id%22:%22E010900232%22,%22udf1%22:%222018105301346%22}`;
  try {
    const { data } = await axios.get(url);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(403).json({ error });
  }
};

export const confirmOrder = async (req, res) => {
  const order = req.body;
  try {
    const { data } =
      await axios.get(`https://test.satim.dz/payment/rest/confirmOrder.do?
     language=EN&orderId=${order.orderId}&password=satim120&userName=SAT2109010233`);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(403).json({ error });
  }
};

export const refundOrder = async (req, res) => {
  const order = req.body;
  try {
    const { data } =
      await axios.get(`https://test.satim.dz/payment/rest/refund.do?amount=${order.amount}&currency=012
     language=EN&orderId=${order.orderId}&password=satim120&userName=SAT2109010233`);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(403).json({ error });
  }
};

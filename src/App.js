import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Badge,
  CardSubtitle,
} from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Container, Row, Col } from "shards-react";
import image from "./count.jpg";
import Appcss from "./App.css";
import axios from "axios";
function App() {
  const [year] = useState(new Date().getFullYear());
  const [dailyQuote, setDailyQuote] = useState([]);
  const [day, setDays] = useState();
  const [totalDays, setTotalDays] = useState();

  useEffect(() => {
    // Update the document title using the browser API
    axios.get(`https://quotes.rest/qod?category=inspire`).then((res) => {
      setDailyQuote(res.data.contents.quotes);
      const difference = +new Date(`01/01/${year + 1}`) - +new Date();
      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
      setTotalDays(days_of_year(year));
    });
  }, []);
  const is_leap_year = (year) => {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  };
  const days_of_year = (year) => {
    return is_leap_year(year) ? 366 : 365;
  };
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`01/01/${year + 1}`) - +new Date();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  // dailyQuote.map((quotes) => {
  //   const { author, quote } = quotes;
  return (
    <Container className="dr-example-container">
      <Col sm={{ size: 12 }}>
        <Card className="card">
          <CardBody>
            <CardTitle> Days Remaining to {year + 1} </CardTitle>
            {/* <Badge>
              {day}/{totalDays}
            </Badge> */}
            <h1>
              <Badge variant="secondary">
                {day}/{totalDays}
              </Badge>
            </h1>
          </CardBody>

          {dailyQuote.map((quote) => {
            return (
              <div>
                <p>
                  '{quote.quote}' - {quote.author}
                </p>
              </div>
            );
          })}

          <CardFooter>Made using ReactJS + ShardsUi</CardFooter>
        </Card>
      </Col>
    </Container>
  );
  // });
}

export default App;

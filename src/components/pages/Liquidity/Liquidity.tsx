import { Accordion, Col, Row } from "react-bootstrap";
import HeadCard from "../../common/HeadCard/HeadCard";
import "./Liquidity.scss";
import { Outlet } from "react-router-dom";
import { ArrowdownGrayIcon } from "../../../assets/icons/svgicons";

const Liquidity = () => {
  return (
    <section className="liquidityPage">
      <Row>
        <Col lg={6}>
          <div className="liquidityAdd_faq">
            <h2>Liquidity</h2>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span> Select Liquidity Pool</span> <ArrowdownGrayIcon />
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Choose Token Pair: The user selects the two tokens they wish
                    to provide liquidity for.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span>Enter Deposit Amounts</span> <ArrowdownGrayIcon />
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Input Value: The user enters the amount for one token. Auto
                    Calculate: The DEX automatically calculates the required
                    amount of the second token based on the current pool ratios.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <span>Approval Check (If Needed)</span> <ArrowdownGrayIcon />
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    First-time Approval: If it's the first time the user
                    interacts with this token pair, they must approve the DEX to
                    move tokens on their behalf. User Approves Tokens: Approve
                    transactions for each token if needed.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <span>Supply Liquidity </span> <ArrowdownGrayIcon />
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Confirm Transaction: The user reviews the details (amounts,
                    rates, expected pool shares) and confirms the transaction.
                    Submit to Blockchain: The transaction is submitted to the
                    blockchain network.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <span> Liquidity mining</span> <ArrowdownGrayIcon />
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Liquidity mining is a DeFi mechanism in which participants
                    provide some of their cryptocurrency assets into various
                    liquidity pools, for which they receive LP token.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  <span>Attractive Returns </span> <ArrowdownGrayIcon />
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    Liquidity mining offers significantly higher returns
                    compared to traditional savings accounts or even some
                    investment vehicles. With annual percentage yields (APYs)
                    sometimes reaching triple digits, it's no wonder investors
                    are flocking to DeFi platforms.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Col>
        <Col lg={6}>
          <Outlet />
        </Col>
      </Row>
    </section>
  );
};

export default Liquidity;

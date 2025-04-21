import { Col, Row } from 'react-bootstrap';
import ethlogo from "../../../assets/images/eth-logo.svg";
import "./HeadCard.scss";
import { MotionProps, motion } from "framer-motion";

type propstypes = {
    text?: string;
    title?: string;
    image?: string;
    imageAnimate?: boolean,
};

const HeadCard = (props: propstypes) => {
    const imageAnimate = {
        initial: {
            rotate: -10,
        },
        rotate: {
            rotate: 15,
        }
    };
    const imageAnimation: MotionProps = props.imageAnimate ? {
        variants: imageAnimate,
        initial: "initial",
        animate: "rotate",
        transition: {
            type: "spring",
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
        }
    } : {};
    return (
        <>
            <div className='head_card'>
                <Row>
                    <Col lg={9} md={8}>
                        <div className='head_card_left'>
                            <motion.img
                                src={props.image}
                                className="head_card_img"
                                alt={props.title}
                                {...imageAnimation}
                            />
                            <div className='head_card_left_text'>
                                <h2>{props.title}</h2>
                                <p>{props.text}</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={4} sm={12}>
                        <div className='head_card_right'>
                            <img src={ethlogo} alt="eth_logo" />
                            <h3>1STC ~ $0.0024</h3>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default HeadCard
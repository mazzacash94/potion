import React from "react";

import * as ReactDOM from "react-dom";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import NFTItem from "./NFTItem";
import Modal from "./Modal";
import { ethers } from "ethers";

import config from "../../web3/config.json";

const Landing = () => {
  // Web3 Setup
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const [account, setAccount] = useState("");
  const [smulipSteams, setSmulipSteams] = useState([]);
  const [battleflyNectars, setBatteflyNectars] = useState([]);
  const [txPending, setTxPending] = useState(false);

  const [dialogPos, setDialogPos] = useState({ top: 0, left: 0 });

  const [showDialog, setShowDialog] = useState(false);
  const [showCraft, setShowCraft] = useState(false);
  const [selectedNFT1, setSelectedNFT1] = useState(0);
  const [selectedNFT2, setSelectedNFT2] = useState(0);
  const [showCraftVideo, setShowCraftVideo] = useState(false);
  const [size, setSize] = useState([0, 0]);
  const videoRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousemove", function (event) {
      setDialogPos({
        top: event.y - (350 * 2) / 3 - 45,
        left: event.x - 440 + 50,
      });
    });
    return () => window.removeEventListener("mousemove");
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoRef.current]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Check Approval Functions

  const checkBattleflyNectarApproval = async () => {
    const getter = new ethers.Contract(
      config.battleflyNectarAddress,
      config.battleflyNectarAbi,
      provider
    );
    const check = await getter.isApprovedForAll(account, config.potionAddress);
    return check;
  };

  const checkSmulipSteamApproval = async () => {
    const getter = new ethers.Contract(
      config.smulipSteamAddress,
      config.smulipSteamAbi,
      provider
    );
    const check = await getter.isApprovedForAll(account, config.potionAddress);
    return check;
  };

  // Set Approval Functions

  const setBattleflyNectarApproval = async () => {
    try {
      const setter = new ethers.Contract(
        config.battleflyNectarAddress,
        config.battleflyNectarAbi,
        signer
      );
      let overrides = {
        from: account,
      };
      const tx = await setter.setApprovalForAll(
        config.potionAddress,
        true,
        overrides
      );
      setTxPending(true);
      await tx.wait();
      setTxPending(false);
    } catch (err) {
      alert(err);
    }
  };

  const setSmulipSteamApproval = async () => {
    try {
      const setter = new ethers.Contract(
        config.smulipSteamAddress,
        config.smulipSteamAbi,
        signer
      );
      let overrides = {
        from: account,
      };
      const tx = await setter.setApprovalForAll(
        config.potionAddress,
        true,
        overrides
      );
      setTxPending(true);
      await tx.wait();
      setTxPending(false);
    } catch (err) {
      alert(err);
    }
  };

  // Craft Function

  const craft = async () => {
    try {
      const setter = new ethers.Contract(
        config.potionAddress,
        config.potionAbi,
        signer
      );
      let overrides = {
        from: account,
      };
      const tx = await setter.craft(overrides);
      setTxPending(true);
      await tx.wait();
      setTxPending(false);
      return true;
    } catch (err) {
      if (err.message.includes("rejected")) {
        alert("Transaction rejected by the user!");
      } else {
        alert("Transaction error!");
      }
      return false;
    }
  };

  // Retrieve tokens functions

  const getSmulipSteamBalance = async (address) => {
    const getter = new ethers.Contract(
      config.smulipSteamAddress,
      config.smulipSteamAbi,
      provider
    );
    const balance = await getter.balanceOf(address, 1);
    let elements = [];
    for (let i = 0; i < balance; i++) {
      elements.push({
        title: "smulip steam",
        id: { i },
        url: "/img/smulipSteam.png",
      });
    }
    setSmulipSteams(elements);
  };

  const getBattleFlyNectarBalance = async (address) => {
    const getter = new ethers.Contract(
      config.battleflyNectarAddress,
      config.battleflyNectarAbi,
      provider
    );
    const balance = await getter.balanceOf(address, 1);
    let elements = [];
    for (let i = 0; i < balance; i++) {
      elements.push({
        title: "battlefly nectar",
        id: { i },
        url: "/img/battleflyNectar.png",
      });
    }
    setBatteflyNectars(elements);
  };

  // Onclick Events

  const onSelectNFT1 = (id) => {
    setSelectedNFT1(id);
  };

  const onSelectNFT2 = (id) => {
    setSelectedNFT2(id);
  };

  const onCraft = async () => {
    if (selectedNFT1 != 0 && selectedNFT2 != 0) {
      let battleflyNectarCheck = await checkBattleflyNectarApproval();
      let smulipSteamCheck = await checkSmulipSteamApproval();
      if (!battleflyNectarCheck) {
        await setBattleflyNectarApproval();
      }
      if (!smulipSteamCheck) {
        await setSmulipSteamApproval();
      }
      let result = await craft();
      if (result) {
        setShowCraftVideo(true);
        await getBattleFlyNectarBalance(account);
        await getSmulipSteamBalance(account);
      }
    }
  };

  const onConnect = async () => {
    const network = await provider.getNetwork();
    if (network.chainId == 421613) {
      const addresses = await provider.send("eth_requestAccounts", []);
      setAccount(addresses[0]);
      getBattleFlyNectarBalance(addresses[0]);
      getSmulipSteamBalance(addresses[0]);
    } else {
      alert("Wrong network... Switch to Arbitrum Goerli!");
    }
  };

  const onBack = () => {
    if (showCraftVideo) {
      videoRef.current.pause();
      setShowCraftVideo(false);
    } else {
      setShowCraft(false);
    }
  };

  return (
    <div className={"minting " + (isMobile ? "mobile" : "")}>
      {!showCraft ? (
        <div className="main">
          <div className="background">
            <img src="/img/background.gif" />
          </div>
          <svg
            className="absolute pos-center w-full z-10"
            viewBox="0 0 754 356"
          >
            {/* <path className="hover:stroke-primary/70 hover:fill-primary/30 cursor-pointer" d="M 471 86 L 466 85 L 443 108 L 442 112 L 445 115 V 134 H 449 L 484 152 V 155 H 486 L 521 138 V 118 L 508 105 Z" fill="transparent"></path> */}
            <path
              className="hover:stroke-primary/70 hover:fill-primary/30 cursor-pointer"
              d="M 628 103 L 583 127 L 562 147 V 152 L 551 164 V 167 L 562 172 L 552 183 V 191 L 571 200 L 582 196 L 603 204 L 630 192 L 640 196 L 651 190 V 179 L 647 176 V 147 L 648 146 V 143 Z"
              fill="transparent"
              onMouseEnter={() => setShowDialog(true)}
              onMouseLeave={() => setShowDialog(false)}
              onClick={() => {
                setShowCraft(true);
                setShowDialog(false);
              }}
            ></path>
          </svg>
          {showDialog | isMobile ? (
            isMobile ? (
              <div
                className="hoverDlg"
                style={{
                  top: (size[1] * 1) / 3 - size[0] / 2 / 1.77 + "px",
                  right: "100px",
                }}
              >
                <img src="/img/AlchemyRoomMain.png" className="dialog" />
                <img src="/img/Polygon.png" className="polygon" />
              </div>
            ) : (
              <div
                className="hoverDlg"
                style={{
                  top: dialogPos.top + "px",
                  left: dialogPos.left + "px",
                }}
              >
                <img src="/img/AlchemyRoomMain.png" className="dialog" />
                <img src="/img/Polygon.png" className="polygon" />
              </div>
            )
          ) : (
            <></>
          )}
          {isMobile ? (
            <div
              className="button cursor-pointer explorerbtn "
              onClick={() => {
                setShowCraft(true);
                setShowDialog(false);
              }}
            >
              EXPLORER NOW
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="craft">
          <div className="background">
            <img src="/img/AlchemyRoomMain.png" />
            <div className="mask" />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="button backbtn cursor-pointer" onClick={onBack}>
                <img src="/img/ic_round-arrow-back.png" />
                <div className="btntext">{!isMobile ? "BACK" : ""}</div>
              </div>
              <div
                className="button connectbtn cursor-pointer"
                id="connectWallet"
                onClick={onConnect}
              >
                {account == "" ? (
                  <>
                    <img src="/img/fluent_wallet-credit-card-32-filled.png" />
                    <div className="btntext" id="address">
                      {!isMobile ? "CONNECT TO WALLET" : ""}
                    </div>
                  </>
                ) : (
                  account
                )}
              </div>
            </div>
            <div className="content">
              {!showCraftVideo ? (
                <>
                  <div className="NFTList">
                    {battleflyNectars.map((nftItem) => (
                      <NFTItem
                        title={nftItem.title}
                        id={nftItem.id}
                        url={nftItem.url}
                        selected={selectedNFT1}
                        selectNFT={onSelectNFT1}
                      />
                    ))}
                  </div>
                  <div className="NFTList">
                    {smulipSteams.map((nftItem) => (
                      <NFTItem
                        title={nftItem.title}
                        id={nftItem.id}
                        url={nftItem.url}
                        selected={selectedNFT2}
                        selectNFT={onSelectNFT2}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="videoTag">
                  <video className="backgroundimg" ref={videoRef}>
                    <source
                      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      type="video/mp4"
                    ></source>
                  </video>
                  <div className="mask"></div>
                  <img
                    src="/img/close.png"
                    className="closeBtn absolute cursor-pointer"
                    onClick={onBack}
                  />
                  {/* <img src="/img/play.png" className='playbtn cursor-pointer absolute'/> */}
                </div>
              )}
            </div>
            {!showCraftVideo ? (
              <div
                className={
                  "button cursor-pointer craftbtn " +
                  (selectedNFT1 == 0 || selectedNFT2 == 0 || txPending ? "disabled" : "")
                }
                onClick={onCraft}
              >
                {txPending ? "pending" : "craft"}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;

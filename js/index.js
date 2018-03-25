/******************
  Market
  - CO : Coinone
  - KK : Kraken
  - PO : Poloniex
  - BX : BX
******************/

const getCOData = (suffix) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.coinone.co.kr/orderbook/?currency=${suffix}&format=json`);
}

const getKKData = (suffix) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.kraken.com/0/public/Depth?pair=${suffix}`);
}

const getPOData = (suffix) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://poloniex.com/public?command=returnOrderBook&currencyPair=${suffix}&depth=30`);
}

// const getBXData = (suffix) => {
//     return fetch(`https://bx.in.th/api/orderbook/?pairing=${suffix}`);
// }
            
window.setInterval( () => {
  Promise.all([getCOData('btc'), getCOData('eth'), getCOData('xrp'), getCOData('etc'), 
                getKKData('XXBTZUSD'), getKKData('XETHZUSD'), getKKData('XXRPZUSD'), getKKData('XETCZUSD'),
                getPOData('USDT_BTC'), getPOData('USDT_ETH'), getPOData('USDT_XRP'), getPOData('USDT_ETC'),
                // getBXData('1'), getBXData('21'), getBXData('25'),
              ])
  .then((data) => {
    Promise.all([data[0].json(), data[1].json(), data[2].json(), data[3].json(),
                  data[4].json(), data[5].json(), data[6].json(), data[7].json(),
                  data[8].json(), data[9].json(), data[10].json(), data[11].json(),
                  // data[12].json(), data[13].json(), data[14].json()
                ])
    .then((data) => {

      // Setup

      var market = ['CO','KK','PO'];
      var currency = ['BTC','ETH','XRP','ETC'];

      // Fund

      var fundAmountKK = 10000;
      var pointKK = 0;

      var fundAmountCO = 10737000;
      var pointCO = 0;

      var fundAmountPO = 10000;
      var pointPO = 0;

      var fundAmountBX = 332200;
      var pointPO = 0;

      // JSON

      var btc_CO = data[0];
      var eth_CO = data[1];
      var xrp_CO = data[2];
      var etc_CO = data[3];
      
      var btc_KK = data[4];
      var eth_KK = data[5];
      var xrp_KK = data[6];
      var etc_KK = data[7];
      
      var btc_PO = data[8];
      var eth_PO = data[9];
      var xrp_PO = data[10];
      var etc_PO = data[11];

      var btc_BX = data[12];
      var eth_BX = data[13];
      var xrp_BX = data[14];

      // Price CO

      var buyBTC_CO = btc_CO.ask[0].price;
      var sellBTC_CO = btc_CO.bid[0].price;

      var buyETH_CO = eth_CO.ask[0].price;
      var sellETH_CO = eth_CO.bid[0].price;

      var buyXRP_CO = xrp_CO.ask[0].price;
      var sellXRP_CO = xrp_CO.bid[0].price;

      var buyETC_CO = etc_CO.ask[0].price;
      var sellETC_CO = etc_CO.bid[0].price;

      // Price KK

      var buyBTC_KK = btc_KK.result.XXBTZUSD.asks[0][0];
      var sellBTC_KK = btc_KK.result.XXBTZUSD.bids[0][0];

      var buyETH_KK = eth_KK.result.XETHZUSD.asks[0][0];
      var sellETH_KK = eth_KK.result.XETHZUSD.bids[0][0];

      var buyXRP_KK = xrp_KK.result.XXRPZUSD.asks[0][0];
      var sellXRP_KK = xrp_KK.result.XXRPZUSD.bids[0][0]

      var buyETC_KK = etc_KK.result.XETCZUSD.asks[0][0];
      var sellETC_KK = etc_KK.result.XETCZUSD.bids[0][0];

      // Price PO

      var buyBTC_PO = btc_PO.asks[0][0];
      var sellBTC_PO = btc_PO.bids[0][0];

      var buyETH_PO = eth_PO.asks[0][0];
      var sellETH_PO = eth_PO.bids[0][0];

      var buyXRP_PO = xrp_PO.asks[0][0];
      var sellXRP_PO = xrp_PO.bids[0][0];

      var buyETC_PO = etc_PO.asks[0][0];
      var sellETC_PO = etc_PO.bids[0][0];

      // Price BX

      // var buyBTC_BX = btc_BX.asks[0][0];
      // var sellBTC_BX = btc_BX.bids[0][0];

      // var buyETH_BX = eth_BX.asks[0][0];
      // var sellETH_BX = eth_BX.bids[0][0];

      // var buyXRP_BX = xrp_BX.asks[0][0];
      // var sellXRP_BX = xrp_BX.bids[0][0];
  
      // Display

      for (var i = 0; i < market.length; i++) {
        for (var j = 0; j < currency.length; j++) {
          if(market[i] == 'BX' && currency[j] == 'ETC') continue
          else if (market[i] == 'CO' && currency[j] == 'XRP'){
            eval('$("#' + market[i] + '-' + currency[j] + '_buychoice").text( "₩ " + parseFloat(buy'
             + currency[j] + '_' + market[i] + ').toFixed(0));');
            eval('$("#' + market[i] + '-' + currency[j] + '_sellchoice").text( "₩ " + parseFloat(sell'
             + currency[j] + '_' + market[i] + ').toFixed(0));');
          }
          else if (currency[j] == 'XRP'){
            eval('$("#' + market[i] + '-' + currency[j] + '_buychoice").text( "$ " + parseFloat(buy'
             + currency[j] + '_' + market[i] + ').toFixed(4));');
            eval('$("#' + market[i] + '-' + currency[j] + '_sellchoice").text( "$ " + parseFloat(sell'
             + currency[j] + '_' + market[i] + ').toFixed(4));');
          }
          else if(market[i] == 'CO'){
            eval('$("#' + market[i] + '-' + currency[j] + '_buychoice").text( "₩ " + parseFloat(buy'
             + currency[j] + '_' + market[i] + ').toFixed(0));');
            eval('$("#' + market[i] + '-' + currency[j] + '_sellchoice").text( "₩ " + parseFloat(sell'
             + currency[j] + '_' + market[i] + ').toFixed(0));');
          }
          else {
            eval('$("#' + market[i] + '-' + currency[j] + '_buychoice").text( "$ " + parseFloat(buy'
             + currency[j] + '_' + market[i] + ').toFixed(2));');
            eval('$("#' + market[i] + '-' + currency[j] + '_sellchoice").text( "$ " + parseFloat(sell'
             + currency[j] + '_' + market[i] + ').toFixed(2));');
          }
        }
      }

      // feeKK

      var feeBuySell_KK = 0.0026;
      var feeBS_KK = 1 - feeBuySell_KK;
      var feeWD_BTC_KK = 0.001
      var feeWD_ETH_KK = 0.005
      var feeWD_ETC_KK = 0.005
      var feeWD_XRP_KK = 0.02            

      // feeCO

      var feeBuySell_CO = 0.001;
      var feeBS_CO = 1 - feeBuySell_CO;
      var feeWD_BTC_CO = 0.0005
      var feeWD_ETH_CO = 0.01
      var feeWD_ETC_CO = 0.01
      var feeWD_XRP_CO = 0.01

      // feePO

      var feeBuySell_PO = 0.0025;
      var feeBS_PO = 1 - feeBuySell_PO;
      var feeWD_BTC_PO = 0.0001
      var feeWD_ETH_PO = 0.005
      var feeWD_ETC_PO = 0.01
      var feeWD_XRP_PO = 0.15

      // // feeBX

      // var feeBuySell_BX = 0.0025;
      // var feeBS_BX = 1 - feeBuySell_BX;
      // var feeWD_BTC_BX = 0.001
      // var feeWD_ETH_BX = 0.005
      // var feeWD_XRP_BX = 0.01

      // Price Fee

      for (var i = 0; i < market.length; i++) {
        for (var j = 0; j < currency.length; j++) {
          if (market[i] == 'BX' && currency[j] == 'ETC') continue;
          else {
            eval("var buy" + currency[j] + "_" + market[i] + "_fee = buy"
             + currency[j] + "_" + market[i] + " / feeBS_" + market[i]);
            eval("var sell" + currency[j] + "_" + market[i] + "_fee = sell"
             + currency[j] + "_" + market[i] + " * feeBS_" + market[i]);  
          }
        }
      }   

      //// One Way 
      //KK-CO

      document.getElementById("KK-CO_BTC_oneWay").innerHTML= 

                  ((((((fundAmountKK/buyBTC_KK_fee)- feeWD_BTC_KK ) * sellBTC_CO_fee) - (fundAmountKK * 1082.87)) / (fundAmountKK * 1082.87)) * 100 ).toFixed(2);           

      document.getElementById("KK-CO_ETH_oneWay").innerHTML= 

                  ((((((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ) * sellETH_CO_fee) - (fundAmountKK * 1082.87)) / (fundAmountKK * 1082.87)) * 100 ).toFixed(2);           

      document.getElementById("KK-CO_XRP_oneWay").innerHTML= 

                  ((((((fundAmountKK/buyXRP_KK_fee)- feeWD_XRP_KK ) * sellXRP_CO_fee) - (fundAmountKK * 1082.87)) / (fundAmountKK * 1082.87)) * 100 ).toFixed(2);           

      document.getElementById("KK-CO_ETC_oneWay").innerHTML= 

                  ((((((fundAmountKK/buyETC_KK_fee)- feeWD_ETC_KK ) * sellETC_CO_fee) - (fundAmountKK * 1082.87)) / (fundAmountKK * 1082.87)) * 100 ).toFixed(2);           

      //KK-PO                       

      document.getElementById("KK-PO_BTC_oneWay").innerHTML= 

                  ((((((fundAmountKK/buyBTC_KK_fee)- feeWD_BTC_KK ) * sellBTC_PO_fee) - (fundAmountKK)) / (fundAmountKK)) * 100 ).toFixed(2);           

      document.getElementById("KK-PO_ETH_oneWay").innerHTML= 

                  ((((((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ) * sellETH_PO_fee) - (fundAmountKK)) / (fundAmountKK)) * 100 ).toFixed(2);           

      document.getElementById("KK-PO_XRP_oneWay").innerHTML= 

                  ((((((fundAmountKK/buyXRP_KK_fee)- feeWD_XRP_KK ) * sellXRP_PO_fee) - (fundAmountKK)) / (fundAmountKK)) * 100 ).toFixed(2);           

      document.getElementById("KK-PO_ETC_oneWay").innerHTML= 

                  ((((((fundAmountKK/buyETC_KK_fee)- feeWD_ETC_KK ) * sellETC_PO_fee) - (fundAmountKK)) / (fundAmountKK)) * 100 ).toFixed(2);           

      // //KK-BX                        

      // document.getElementById("KK-BX_BTC_oneWay").innerHTML= 

      //             ((((((fundAmountKK/buyBTC_KK_fee)- feeWD_BTC_KK ) * sellBTC_BX_fee) - (fundAmountKK * 33.22)) / (fundAmountKK * 33.22)) * 100 ).toFixed(2);           

      // document.getElementById("KK-BX_ETH_oneWay").innerHTML= 

      //             ((((((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ) * sellETH_BX_fee) - (fundAmountKK * 33.22)) / (fundAmountKK * 33.22)) * 100 ).toFixed(2);           

      // document.getElementById("KK-BX_XRP_oneWay").innerHTML= 

      //             ((((((fundAmountKK/buyXRP_KK_fee)- feeWD_XRP_KK ) * sellXRP_BX_fee) - (fundAmountKK * 33.22)) / (fundAmountKK * 33.22)) * 100 ).toFixed(2);           

      //  //CO-PO                        

      document.getElementById("CO-PO_BTC_oneWay").innerHTML= 

                  ((((((fundAmountCO/buyBTC_CO_fee)- feeWD_BTC_CO ) * sellBTC_PO_fee) - (fundAmountCO * 0.000923472)) / (fundAmountCO * 0.000923472)) * 100 ).toFixed(2);           

      document.getElementById("CO-PO_ETH_oneWay").innerHTML= 

                  ((((((fundAmountCO/buyETH_CO_fee)- feeWD_ETH_CO ) * sellETH_PO_fee) - (fundAmountCO * 0.000923472)) / (fundAmountCO * 0.000923472)) * 100 ).toFixed(2);           

      document.getElementById("CO-PO_XRP_oneWay").innerHTML= 

                  ((((((fundAmountCO/buyXRP_CO_fee)- feeWD_XRP_CO ) * sellXRP_PO_fee) - (fundAmountCO * 0.000923472)) / (fundAmountCO * 0.000923472)) * 100 ).toFixed(2);           

      document.getElementById("CO-PO_ETC_oneWay").innerHTML= 

                  ((((((fundAmountCO/buyETC_CO_fee)- feeWD_ETC_CO ) * sellETC_PO_fee) - (fundAmountCO * 0.000923472)) / (fundAmountCO * 0.000923472)) * 100 ).toFixed(2);           

      // //CO-BX                       

      // document.getElementById("CO-BX_BTC_oneWay").innerHTML= 

      //             ((((((fundAmountCO/buyBTC_CO_fee)- feeWD_BTC_CO ) * sellBTC_BX_fee) - (fundAmountCO / 33.87)) / (fundAmountCO / 33.87)) * 100 ).toFixed(2);           

      // document.getElementById("CO-BX_ETH_oneWay").innerHTML= 

      //             ((((((fundAmountCO/buyETH_CO_fee)- feeWD_ETH_CO ) * sellETH_BX_fee) - (fundAmountCO / 33.87)) / (fundAmountCO / 33.87)) * 100 ).toFixed(2);           

      // document.getElementById("CO-BX_XRP_oneWay").innerHTML= 

      //             ((((((fundAmountCO/buyXRP_CO_fee)- feeWD_XRP_CO ) * sellXRP_BX_fee) - (fundAmountCO / 33.87)) / (fundAmountCO / 33.87)) * 100 ).toFixed(2);           

      // //PO-BX                        

//       document.getElementById("PO-BX_BTC_oneWay").innerHTML= 

//                   ((((((fundAmountPO/buyBTC_PO_fee)- feeWD_BTC_PO ) * sellBTC_BX_fee) - (fundAmountPO * 33.22)) / (fundAmountPO * 33.22)) * 100 ).toFixed(2);           

//       document.getElementById("PO-BX_ETH_oneWay").innerHTML= 

//                   ((((((fundAmountPO/buyETH_PO_fee)- feeWD_ETH_PO ) * sellETH_BX_fee) - (fundAmountPO * 33.22)) / (fundAmountPO * 33.22)) * 100 ).toFixed(2);           

//       document.getElementById("PO-BX_XRP_oneWay").innerHTML= 

//                   ((((((fundAmountPO/buyXRP_PO_fee)- feeWD_XRP_PO ) * sellXRP_BX_fee) - (fundAmountPO * 33.22)) / (fundAmountPO * 33.22)) * 100 ).toFixed(2);           
// // 
      //  //CO-KK                        

      document.getElementById("CO-KK_BTC_oneWay").innerHTML= 

                  ((((((fundAmountCO/buyBTC_CO_fee)- feeWD_BTC_CO ) * sellBTC_KK_fee) - (fundAmountCO * 0.000923472)) / (fundAmountCO * 0.000923472)) * 100 ).toFixed(2);           

      document.getElementById("CO-KK_ETH_oneWay").innerHTML= 

                  ((((((fundAmountCO/buyETH_CO_fee)- feeWD_ETH_CO ) * sellETH_KK_fee) - (fundAmountCO * 0.000923472)) / (fundAmountCO * 0.000923472)) * 100 ).toFixed(2);           

      document.getElementById("CO-KK_XRP_oneWay").innerHTML= 

                  ((((((fundAmountCO/buyXRP_CO_fee)- feeWD_XRP_CO ) * sellXRP_KK_fee) - (fundAmountCO * 0.000923472)) / (fundAmountCO * 0.000923472)) * 100 ).toFixed(2);           

      document.getElementById("CO-KK_ETC_oneWay").innerHTML= 

                  ((((((fundAmountCO/buyETC_CO_fee)- feeWD_ETC_CO ) * sellETC_KK_fee) - (fundAmountCO * 0.000923472)) / (fundAmountCO * 0.000923472)) * 100 ).toFixed(2);           

      //PO-KK                        

      document.getElementById("PO-KK_BTC_oneWay").innerHTML= 

                  ((((((fundAmountPO/buyBTC_PO_fee)- feeWD_BTC_PO ) * sellBTC_KK_fee) - (fundAmountPO)) / (fundAmountPO)) * 100 ).toFixed(2);           

      document.getElementById("PO-KK_ETH_oneWay").innerHTML= 

                  ((((((fundAmountPO/buyETH_PO_fee)- feeWD_ETH_PO ) * sellETH_KK_fee) - (fundAmountPO)) / (fundAmountPO)) * 100 ).toFixed(2);           

      document.getElementById("PO-KK_XRP_oneWay").innerHTML= 

                  ((((((fundAmountPO/buyXRP_PO_fee)- feeWD_XRP_PO ) * sellXRP_KK_fee) - (fundAmountPO)) / (fundAmountPO)) * 100 ).toFixed(2);           

      document.getElementById("PO-KK_ETC_oneWay").innerHTML= 

                  ((((((fundAmountPO/buyETC_PO_fee)- feeWD_ETC_PO ) * sellETC_KK_fee) - (fundAmountPO)) / (fundAmountPO)) * 100 ).toFixed(2);           

      // // //BX-KK                        

      // document.getElementById("BX-KK_BTC_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyBTC_BX_fee)- feeWD_BTC_BX ) * sellBTC_KK_fee) - (fundAmountBX / 33.22)) / (fundAmountBX / 33.22)) * 100 ).toFixed(2);           

      // document.getElementById("BX-KK_ETH_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyETH_BX_fee)- feeWD_ETH_BX ) * sellETH_KK_fee) - (fundAmountBX / 33.22)) / (fundAmountBX / 33.22)) * 100 ).toFixed(2);           

      // document.getElementById("BX-KK_XRP_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyXRP_BX_fee)- feeWD_XRP_BX ) * sellXRP_KK_fee) - (fundAmountBX / 33.22)) / (fundAmountBX / 33.22)) * 100 ).toFixed(2);           

      //  //PO-CO                        

      document.getElementById("PO-CO_BTC_oneWay").innerHTML= 

                  ((((((fundAmountPO/buyBTC_PO_fee)- feeWD_BTC_PO ) * sellBTC_CO_fee) - (fundAmountPO * 1082.87)) / (fundAmountPO * 1082.87)) * 100 ).toFixed(2);           

      document.getElementById("PO-CO_ETH_oneWay").innerHTML= 

                  ((((((fundAmountPO/buyETH_PO_fee)- feeWD_ETH_PO ) * sellETH_CO_fee) - (fundAmountPO * 1082.87)) / (fundAmountPO * 1082.87)) * 100 ).toFixed(2);           

      document.getElementById("PO-CO_XRP_oneWay").innerHTML= 

                  ((((((fundAmountPO/buyXRP_PO_fee)- feeWD_XRP_PO ) * sellXRP_CO_fee) - (fundAmountPO * 1082.87)) / (fundAmountPO * 1082.87)) * 100 ).toFixed(2);           

      document.getElementById("PO-CO_ETC_oneWay").innerHTML= 

                  ((((((fundAmountPO/buyETC_PO_fee)- feeWD_ETC_PO ) * sellETC_CO_fee) - (fundAmountPO * 1082.87)) / (fundAmountPO * 1082.87)) * 100 ).toFixed(2);           

      //BX-CO  

      // document.getElementById("BX-CO_BTC_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyBTC_BX_fee)- feeWD_BTC_BX ) * sellBTC_CO_fee) - (fundAmountBX * 33.85)) / (fundAmountBX * 33.85)) * 100 ).toFixed(2);           

      // document.getElementById("BX-CO_ETH_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyETH_BX_fee)- feeWD_ETH_BX ) * sellETH_CO_fee) - (fundAmountBX * 33.85)) / (fundAmountBX * 33.85)) * 100 ).toFixed(2);           

      // document.getElementById("BX-CO_XRP_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyXRP_BX_fee)- feeWD_XRP_BX ) * sellXRP_CO_fee) - (fundAmountBX * 33.85)) / (fundAmountBX * 33.85)) * 100 ).toFixed(2);           

      //BX-PO

      // document.getElementById("BX-PO_BTC_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyBTC_BX_fee)- feeWD_BTC_BX ) * sellBTC_PO_fee) - (fundAmountBX / 33.22)) / (fundAmountBX / 33.22)) * 100 ).toFixed(2);           

      // document.getElementById("BX-PO_ETH_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyETH_BX_fee)- feeWD_ETH_BX ) * sellETH_PO_fee) - (fundAmountBX / 33.22)) / (fundAmountBX / 33.22)) * 100 ).toFixed(2);           

      // document.getElementById("BX-PO_XRP_oneWay").innerHTML= 

      //             ((((((fundAmountBX/buyXRP_BX_fee)- feeWD_XRP_BX ) * sellXRP_PO_fee) - (fundAmountBX / 33.22)) / (fundAmountBX / 33.22)) * 100 ).toFixed(2);           

                            

             

      // function calculate (priMarket, secMarket, priCurrency, secCurrency, pattern) {

      //   switch(pattern) {

      //     case 1:

      //       return eval('((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket

      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ').toFixed(2);');

      //     case 2:

      //       return eval('(((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket

      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'

      //        + secMarket + '_fee).toFixed(0);');

      //     case 3:

      //       return eval('(((((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket

      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'

      //        + secMarket + '_fee) / buy' + secCurrency + '_' + secMarket + '_fee) - feeWD_'

      //        + secCurrency + '_' + priMarket + ').toFixed(2);');

      //     case 4:

      //       return eval('((((((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket

      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'

      //        + secMarket + '_fee) / buy' + secCurrency + '_' + secMarket + '_fee) - feeWD_'

      //        + secCurrency + '_' + priMarket + ') * sell' + secCurrency + '_' + priMarket

      //        + '_fee).toFixed(0);');

      //     case 5:

      //       return eval('(((((((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket

      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'

      //        + secMarket + '_fee) / buy' + secCurrency + '_' + secMarket + '_fee) - feeWD_'

      //        + secCurrency + '_' + priMarket + ') * sell' + secCurrency + '_' + priMarket

      //        + '_fee) - fundAmount' + priMarket + ').toFixed(0);');

      //     case 6:

      //       return eval('(((((((((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket

      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'

      //        + secMarket + '_fee) / buy' + secCurrency + '_' + secMarket + '_fee) - feeWD_'

      //        + secCurrency + '_' + priMarket + ') * sell' + secCurrency + '_' + priMarket

      //        + '_fee) - fundAmount' + priMarket + ') / fundAmount' + priMarket + ') * 100).toFixed(2);');

      //   }

      // }

     
      /*
      1. fundAmountCo
      2. 1./buyETH_CO
      3. 2.*sellETH_KK
      4. 3./buyXRP_KK
      5. 4.*sellXRP_CO
      6. (5.-1.)
      7. (6./1.)*100*/

      /*************************************
        FUNCTION REFERENCE : KK-CO ETH-XRP
        case 1 : ((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ).toFixed(2);
        case 2 : (((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ) * sellETH_CO_fee).toFixed(0);
        case 3 : (((((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ) * sellETH_CO_fee) / buyXRP_CO_fee)- feeWD_XRP_CO).toFixed(2);            
        case 4 : ((((((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ) * sellETH_CO_fee) / buyXRP_CO_fee)- feeWD_XRP_CO) * sellXRP_KK_fee).toFixed(0);
        case 5 : (((((((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ) * sellETH_CO_fee) / buyXRP_CO_fee)- feeWD_XRP_CO) * sellXRP_KK_fee) - fundAmountKK).toFixed(0);
        case 6 : (((((((((fundAmountKK/buyETH_KK_fee)- feeWD_ETH_KK ) * sellETH_CO_fee) / buyXRP_CO_fee)- feeWD_XRP_CO) * sellXRP_KK_fee) - fundAmountKK) / fundAmountKK) * 100).toFixed(2);
      *************************************/

      // function calculate (priMarket, secMarket, priCurrency, secCurrency, pattern) {
      //   switch(pattern) {
      //     case 1:
      //       return eval('((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket
      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ').toFixed(2);');
      //     case 2:
      //       return eval('(((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket
      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'
      //        + secMarket + '_fee).toFixed(0);');
      //     case 3:
      //       return eval('(((((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket
      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'
      //        + secMarket + '_fee) / buy' + secCurrency + '_' + secMarket + '_fee) - feeWD_'
      //        + secCurrency + '_' + priMarket + ').toFixed(2);');
      //     case 4:
      //       return eval('((((((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket
      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'
      //        + secMarket + '_fee) / buy' + secCurrency + '_' + secMarket + '_fee) - feeWD_'
      //        + secCurrency + '_' + priMarket + ') * sell' + secCurrency + '_' + priMarket
      //        + '_fee).toFixed(0);');
      //     case 5:
      //       return eval('(((((((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket
      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'
      //        + secMarket + '_fee) / buy' + secCurrency + '_' + secMarket + '_fee) - feeWD_'
      //        + secCurrency + '_' + priMarket + ') * sell' + secCurrency + '_' + priMarket
      //        + '_fee) - fundAmount' + priMarket + ').toFixed(0);');
      //     case 6:
      //       return eval('(((((((((fundAmount' + priMarket + ' / buy' + priCurrency + '_' + priMarket
      //        + '_fee) - feeWD_' + priCurrency + '_' + priMarket + ') * sell' + priCurrency + '_'
      //        + secMarket + '_fee) / buy' + secCurrency + '_' + secMarket + '_fee) - feeWD_'
      //        + secCurrency + '_' + priMarket + ') * sell' + secCurrency + '_' + priMarket
      //        + '_fee) - fundAmount' + priMarket + ') / fundAmount' + priMarket + ') * 100).toFixed(2);');
      //   }
      // }

      // for (var i = 0; i < market.length; i++) {
      //   for (var j = 0; j < market.length; j++) {
      //     for (var k = 0; k < currency.length; k++) {
      //       for (var l = 0; l < currency.length; l++) {
      //         if (market[i] == market[j] || currency[k] == currency[l]) continue;
      //         else if(market[i] == 'BX' && (currency[k] == 'ETC' || currency[l] == 'ETC')) continue; 
      //         else if(market[j] == 'BX' && (currency[k] == 'ETC' || currency[l] == 'ETC')) continue;
      //         else if(market[i] == 'CO') {
      //           eval('$("#cryptoGO_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text(' + calculate(market[i], market[j], currency[k], currency[l], 1) + ');');
      //           eval('$("#moneyThere_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("$ " + ' + calculate(market[i], market[j], currency[k], currency[l], 2) + ');');
      //           eval('$("#cryptoBack_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text(' + calculate(market[i], market[j], currency[k], currency[l], 3) + ');');
      //           eval('$("#moneyBack_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("₩ " +  ' + calculate(market[i], market[j], currency[k], currency[l], 4) + ');');
      //           eval('$("#profit_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("₩ " +  ' + calculate(market[i], market[j], currency[k], currency[l], 5) + ');');
      //           eval('document.getElementById("profit%_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").innerHTML = ' + calculate(market[i], market[j], currency[k], currency[l], 6) + ';');
      //         }
      //         else if(market[j] == 'CO') {
      //           eval('$("#cryptoGO_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text( ' + calculate(market[i], market[j], currency[k], currency[l], 1) + ');');
      //           eval('$("#moneyThere_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("₩ " + ' + calculate(market[i], market[j], currency[k], currency[l], 2) + ');');
      //           eval('$("#cryptoBack_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text(' + calculate(market[i], market[j], currency[k], currency[l], 3) + ');');
      //           eval('$("#moneyBack_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("$ " +  ' + calculate(market[i], market[j], currency[k], currency[l], 4) + ');');
      //           eval('$("#profit_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("$ " +  ' + calculate(market[i], market[j], currency[k], currency[l], 5) + ');');
      //           eval('document.getElementById("profit%_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").innerHTML = ' + calculate(market[i], market[j], currency[k], currency[l], 6) + ';');
      //         }
      //         else {
      //           eval('$("#cryptoGO_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text(' + calculate(market[i], market[j], currency[k], currency[l], 1) + ');');
      //           eval('$("#moneyThere_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("$ " + ' + calculate(market[i], market[j], currency[k], currency[l], 2) + ');');
      //           eval('$("#cryptoBack_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text(' + calculate(market[i], market[j], currency[k], currency[l], 3) + ');');
      //           eval('$("#moneyBack_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("$ " + ' + calculate(market[i], market[j], currency[k], currency[l], 4) + ');');
      //           eval('$("#profit_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").text("$ " + ' + calculate(market[i], market[j], currency[k], currency[l], 5) + ');');
      //           eval('document.getElementById("profit%_' + market[i] + '-' + market[j] + '_' + currency[k] + '-' + currency[l]
      //            + '").innerHTML = ' + calculate(market[i], market[j], currency[k], currency[l], 6) + ';');
      //         }
      //       }
      //     }
      //   }
      // }
      
    });
  });
} , 5000);





// document.addEventListener('DOMContentLoaded', function () {
//   particleground(document.getElementById('slider-section'), {
//     dotColor: '#5cbdaa',
//     lineColor: '#5cbdaa'
//   });
//   var intro = document.getElementById('intro');
//   intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
// }, false);
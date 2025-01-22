import { Rent, Sale } from "@prisma/client";

export function saleFilter(sales){
    const highToLowSales = [...sales].sort((s1, s2) => +s2.price - +s1.price);
    const lowToHighSales = [...sales].sort((s1, s2) => +s1.price - +s2.price);
    
    const newestSales = [...sales].sort((s1, s2) => +s2.submitedAt - +s1.submitedAt);
    const oldestSales = [...sales].sort((s1, s2) => +s1.submitedAt - +s2.submitedAt);

    return {
        highToLowSales,
        lowToHighSales,
        newestSales,
        oldestSales,
    };
};

export function rentfilter(rents,type = null){
    if(type){
        rents = rents.filter((rent)=> rent.type.toString() == type.toString());
    }
    const highToLowMortgage = [...rents].sort((s1, s2) => +s2.mortgage - +s1.mortgage);
    const lowToHighMortgage = [...highToLowMortgage].reverse();
    
    const highToLowRent = [...rents].sort((s1, s2) => +s2.rent - +s1.rent);
    const lowToHighRent = [...highToLowRent].reverse();
    
    const newestRent = [...rents].sort((s1, s2) => +s2.submitedAt - +s1.submitedAt);
    const oldestRent = [...newestRent].reverse();

    return {
        highToLowMortgage,
        lowToHighMortgage,
        highToLowRent,
        lowToHighRent,
        newestRent,
        oldestRent,
    };
}


export function buyerFilter(buyers){
    const newsetBuyer = [...buyers].sort((buyer1,buyer2)=> +buyer2.submitedAt - +buyer1.submitedAt);
    const oldestBuyer = [...buyers].reverse();

    const highToLowBuyers = [...buyers]
        .filter((buyer)=> buyer.type.toString() == "Buyer")
        .sort((buyer1,buyer2)=>buyer2.price - buyer1.price);
    const lowToHighBuyers = [...highToLowBuyers].reverse();

    const highToLowAskerRent = [...buyers]
        .filter((buyer)=>buyer.type.toString() == "Asker")
        .sort((buyer1,buyer2)=> +buyer2.rent - +buyer1.rent);
    const lowToHighAskerRent = [...highToLowAskerRent].reverse();

    const highToLowAskerMortgage = [...buyers]  
        .filter((buyer)=>buyer.type.toString() == "Asker")
        .sort((buyer1,buyer2)=> +buyer2.mortgage - +buyer1.mortgage);
    const lowToHighAskerMortgage = [...highToLowAskerMortgage].reverse();

    return {
        newsetBuyer,
        oldestBuyer,
        highToLowBuyers,
        lowToHighBuyers,
        highToLowAskerRent,
        lowToHighAskerRent,
        highToLowAskerMortgage,
        lowToHighAskerMortgage,
    };
};

export function houseFilter(house){
    const newsetBuyer = [...house].sort((buyer1,buyer2)=> +buyer2.submitedAt - +buyer1.submitedAt);
    const oldestBuyer = [...house].reverse();

    const highToLowBuyers = [...house]
        .filter((buyer)=> buyer.type.toString() == "Buyer")
        .sort((buyer1,buyer2)=>buyer2.price - buyer1.price);
    const lowToHighBuyers = [...highToLowBuyers].reverse();

    const highToLowAskerRent = [...house]
        .filter((buyer)=>buyer.type.toString() == "Asker")
        .sort((buyer1,buyer2)=> +buyer2.rent - +buyer1.rent);
    const lowToHighAskerRent = [...highToLowAskerRent].reverse();

    const highToLowAskerMortgage = [...house]  
        .filter((buyer)=>buyer.type.toString() == "Asker")
        .sort((buyer1,buyer2)=> +buyer2.mortgage - +buyer1.mortgage);
    const lowToHighAskerMortgage = [...highToLowAskerMortgage].reverse();

    const highToLowRentMortgage = [...house].sort((s1, s2) => +s2.mortgage - +s1.mortgage);
    const lowToHighRentMortgage = [...highToLowRentMortgage].reverse();
    
    const highToLowRent = [...house].sort((s1, s2) => +s2.rent - +s1.rent);
    const lowToHighRent = [...highToLowRent].reverse();

    const highToLowSales = [...house].sort((s1, s2) => +s2.price - +s1.price);
    const lowToHighSales = [...house].sort((s1, s2) => +s1.price - +s2.price);

    return {
        newsetBuyer,
        oldestBuyer,
        highToLowBuyers,
        lowToHighBuyers,
        highToLowAskerRent,
        lowToHighAskerRent,
        highToLowAskerMortgage,
        lowToHighAskerMortgage,
        highToLowRentMortgage,
        lowToHighRentMortgage,
        highToLowRent,
        lowToHighRent,
        highToLowSales,
        lowToHighSales,
    };
};
import { House } from "@prisma/client";

export function houseFilter(house:House[]){
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

    const highToLowRentMortgage = [...house]    
        .filter((rent:House)=>rent.category.toString() === "Rent")
        .sort((s1, s2) => +s2.mortgage - +s1.mortgage);
    const lowToHighRentMortgage = [...highToLowRentMortgage].reverse();
    
    const highToLowRent = [...house]
        .filter((rent:House)=> rent.category.toString() === "Rent")
        .sort((s1, s2) => +s2.rent - +s1.rent);
    const lowToHighRent = [...highToLowRent].reverse();

    const highToLowSales = [...house]
        .filter((sale)=> sale.category.toString() == "Sale")
        .sort((s1, s2) => +s2.price - +s1.price);
    const lowToHighSales = [...house].reverse();

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
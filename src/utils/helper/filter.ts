import { House } from "@prisma/client";

export function houseFilter(house:House[]){
    const newestHouse = [...house].sort((buyer1,buyer2)=> +buyer2.submitedAt - +buyer1.submitedAt);
    const oldestHouse = [...house].reverse();

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
        newestHouse,
        oldestHouse,
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

export function filterHouseByCategory(house:House[],category:string){
    const newestHouse = [...house].sort((buyer1,buyer2)=> +buyer2.submitedAt - +buyer1.submitedAt);
    const oldestHouse = [...house].reverse();
    let highToLowHouse = [];
    let lowToHighHouse = [];
    let highMortgage = [];
    let lowMortgage = [];
    switch(category){
        case "Buyer":
            highToLowHouse = [...house]
                .filter((sale)=> sale.category.toString() == category.toString())
                .sort((s1, s2) => +s2.price - +s1.price);
            lowToHighHouse = [...house].reverse();
        case "Asker":
            // Sort Rent
            highToLowHouse = [...house]
                .filter((sale)=> sale.category.toString() == category.toString())
                .sort((s1, s2) => +s2.rent - +s1.rent);
            lowToHighHouse = [...house].reverse();
            // Sort Mortgage
            highMortgage = [...house]
                .filter((sale)=> sale.category.toString() == category.toString())
                .sort((s1, s2) => +s2.mortgage - +s1.mortgage);
            lowMortgage = [...house].reverse();
        case "Rent":
            // Sort Rent
            highToLowHouse = [...house]
                .filter((sale)=> sale.category.toString() == category.toString())
                .sort((s1, s2) => +s2.rent - +s1.rent);
            lowToHighHouse = [...house].reverse();
            // Sort Mortgage
            highMortgage = [...house]
                .filter((sale)=> sale.category.toString() == category.toString())
                .sort((s1, s2) => +s2.mortgage - +s1.mortgage);
            lowMortgage = [...house].reverse();
        case "Sale":
            highToLowHouse = [...house]
                .filter((sale)=> sale.category.toString() == category.toString())
                .sort((s1, s2) => +s2.price - +s1.price);
            lowToHighHouse = [...house].reverse();
    }

    return {
        newestHouse,
        oldestHouse,
        highToLowHouse,
        lowToHighHouse,
        highMortgage,
        lowMortgage,
    };
};
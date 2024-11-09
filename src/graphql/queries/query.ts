export const query = `#graphql
    type Query{
        userPropertySubmited:Submited

        allSale:[Sale]
        topViewedSales:[Sale]
        newSales:[Sale]

        allRent:[Rent]
        topViewedRents:[Rent]
        newRents:[Rent]
    }
`;
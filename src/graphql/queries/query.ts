export const query = `#graphql
    type Query{
        userPropertySubmited:AllProperties
        likeProperty:AllProperties

        allSale:[Sale]
        topViewedSales:[Sale]

        allRent:[Rent]
        topViewedRents:[Rent]

        allBuyer:[Buyer]
        filteredAllProperty:Json
    }
`;
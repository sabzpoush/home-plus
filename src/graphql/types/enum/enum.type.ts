export const enumTypes = `#graphql
    enum PropertyType{
        Apartment
        Pilot
        Basement
        Land
        Resident
        Eco
    }

    enum PropertyFilterType{
        Apartment
        Pilot
        Basement
        Land
        Resident
        Eco
        Rent
        Buyer
        Asker
    }

    enum MainType{
        Sale
        Rent
        Buyer
    }

    enum BuyerRequestType{
        Apartment
        Pilot
        Basement
        Land
        Resident
        Rent
    }

    enum BuyerType{
        Buyer
        Asker
    }

    enum RentType{
        Rent
        EcoRent
    }
`;
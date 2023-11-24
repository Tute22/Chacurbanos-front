export const membersEnabled = (members: Array<{ id: number; name: string; lastName: string; email: string; password: string; role: string; status: string; day: string | null; img: string}>) => {
    let acc = 0
    const arrAux = []

    for(let i=0; i < members.length; i++){
        if(members[i].role === "delivery"){
            arrAux.push(members[i])
            acc++
        }
    }
    
    acc = 0

    for(let i=0; i < arrAux.length; i++){
        if(arrAux[i].status === "enabled"){
            acc++
        }
    }

    return acc
};

export const membersWhoAreDelivery = (members: Array<{ id: number; name: string; lastName: string; email: string; password: string; role: string; status: string; day: string | null; img: string}>) => {
    let acc = 0

    for(let i=0; i < members.length; i++){
        if(members[i].role === "delivery"){
            acc++
        }
    }

    return acc
};


export const shipmentsDelivered = (shipments: Array<{ id: number; number_of_order: string; address: string; status: string | null; to: string; weight: number}>) => {
    let acc = 0

    for(let i=0; i < shipments.length; i++){
        if(shipments[i].status === "delivered"){
            acc++
        }
    }

    return acc
};

export const percentage = (value1: number, value2: number) => {

    let percentage = (value1 / value2) * 100;
    percentage = Math.round(percentage * 100) / 100;

    return percentage;
}
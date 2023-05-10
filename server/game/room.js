class Room {
    constructor(data, client) {
        console.log('房间信息data', data);
        for (const dataKey in data) {
            this[dataKey] = data[dataKey];
        }
    }

    getRoomInfo() {
        return {
            ['room_id']: this['room_id'],
            ['create_id']: this['create_id'],
            ['jiesan']: this['jiesan'],
            ['current_numbers']: this['current_numbers'],
        }
    }
}

module.exports = Room;
import { type PointDTO } from './dto'

const getRandomNumber = function (min, ref) {
    return Math.random() * ref + min;
}

class PointAPI {
    async fetchPoints() {
        const features: Array<PointDTO> = [];

        for (let i = 0; i < 10000; i++) {
            const x = -getRandomNumber(50, 50);
            const y = getRandomNumber(10, 50);
            const code = `${x}:${y}`;

            features.push({
                name: 'Company',
                address: 'Wall Street',
                x,
                y,
                code,
            });
        }

        return { data: features, status: 200 };
    }
}

export default new PointAPI;

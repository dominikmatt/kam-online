const sleep = require('sleep');

class Pathfinder {
    constructor(options) {
        this._grid = {};
        this._matrix = [];
        this._width = options.width;
        this._height = options.height;
    }

    findShortestPath(start, target) {

        for (let posX in this._grid) {
            for (let posZ in this._grid[posX]) {
                console.log(parseInt(posZ) + 15);
            }
        }
        this.target = target;
        const startLocation = {
            position: start,
            path: [],
            status: 'start'
        };
        const queue = [startLocation];
        const targetStatus = this.checkLocationStatus({
            position: target
        });

        if ('Blocked' === targetStatus) {
            return false;
        }

        console.log('startLocation:', startLocation);

        let count = 0;
        while (queue.length > 0) {
            // Take the first location off the queue
            var currentLocation = queue.shift();
            let newLocation;

            count++;

            // Explore North
            newLocation = this.exploreInDirection(currentLocation, 'North');
            if (newLocation.status === 'Goal') {
                newLocation.path.push([
                    target.x, target.z
                ]);
                console.log('stop1');
                return newLocation;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore East
            newLocation = this.exploreInDirection(currentLocation, 'East');
            if (newLocation.status === 'Goal') {
                newLocation.path.push([
                    target.x, target.z
                ]);
                console.log('stop2');
                return newLocation;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore South
            newLocation = this.exploreInDirection(currentLocation, 'South');
            if (newLocation.status === 'Goal') {
                newLocation.path.push([
                    target.x, target.z
                ]);
                console.log('stop3');
                return newLocation;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            // Explore West
            newLocation = this.exploreInDirection(currentLocation, 'West');
            if (newLocation.status === 'Goal') {
                newLocation.path.push([
                    target.x, target.z
                ]);
                console.log('stop4');
                return newLocation;
            } else if (newLocation.status === 'Valid') {
                queue.push(newLocation);
            }

            if (newLocation.position.x === startLocation.position.x && newLocation.position.z === startLocation.position.z && 1 < count) {
                console.log('return');
                return false;
            }
        }

        console.log('stop5');
        return false;
    }

    exploreInDirection(currentLocation, direction) {
        var newPath = currentLocation.path.slice();

        newPath.push([
            currentLocation.position.x, currentLocation.position.z
        ]);

        var posX = currentLocation.position.x;
        var posZ = currentLocation.position.z;

        if (direction === 'North') {
            posZ -= 1;
        } else if (direction === 'East') {
            posX += 1;
        } else if (direction === 'South') {
            posZ += 1;
        } else if (direction === 'West') {
            posX -= 1;
        }

        var newLocation = {
            position: {x: posX, z: posZ},
            path: newPath,
            status: 'Unknown'
        };
        newLocation.status = this.checkLocationStatus(newLocation);

        // If this new location is valid, mark it as 'Visited'
        if (newLocation.status === 'Valid') {
            this._grid[newLocation.position.x][newLocation.position.z].finderState = 'Visited';
        }

        return newLocation;
    }

    checkLocationStatus(location, grid) {
        var posX = location.position.x;
        var posZ = location.position.z;

        if (location.position.x < -(this._width / 2)
            || location.position.x > (this._width / 2)
            || location.position.z < -(this._height / 2)
            || location.position.z > (this._height / 2)
        ) {
            // location is not on the grid--return false
            return 'Invalid';
        }  else if (false === this._grid[posX][posZ].street) {
            // location is either an obstacle or has been visited
            return 'Blocked';
        } else if (posX === this.target.x && posZ === this.target.z) {
            return 'Goal';
        } else {
            return 'Valid';
        }
    }

    get grid() {
        return this._grid;
    }

    set grid(value) {
        this._grid = value;
    }
}

module.exports = Pathfinder;
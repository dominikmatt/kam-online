module.exports.normalizePosition = (position) => {
    let x = Math.ceil(position.x);
    let y = position.y;
    let z = Math.ceil(position.z);

    return new BABYLON.Vector3(
        x,
        y,
        z
    );
};
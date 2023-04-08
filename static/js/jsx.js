function Clock(props) {
    return (
        '当前时间：' + props.date.toLocaleTimeString()
    );
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('time')
    );
}

setInterval(tick, 1);
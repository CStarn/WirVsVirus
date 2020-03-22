export function formatDatetime(datetime) {
    const date = new Date(datetime);
    return date.toLocaleString( ["de"],
        { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function formatTime(datetime) {
    const date = new Date(datetime);
    return date.toLocaleTimeString( ["de"],
        {hour: '2-digit', minute: '2-digit' });
}

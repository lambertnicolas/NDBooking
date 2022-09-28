import React, { useEffect } from 'react'
import { ChannelsProvider, usePrivateChannels } from "./Channels"

// FIRST: we will wrap our application with the `ChannelsProvider`

function App () {
    // get the user and the access token SOMEHOW!
    const user = getUser() // via context or any other way
    const token = getToken() // via local storage or any other ways
    return <ChannelsProvider authUser={user} authToken={token}>
        <Notifications authUserId={user.id} />
    </ChannelsProvider>
}


// Next, we will listen to a private channel for an event
// and update the data on events

// A channel listens to a particular event
// Here is an example event from Laravel when sending notifications
const NOTIFICATION_EVENT =
    ".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated"



/**
 * Our notification channel which notif
 */
function useNotificationChannel (
    authUserId,
    onChange
) {
    const channels = usePrivateChannels(authUserId)
    useEffect(() => {
        if (channels) {
            channels.listen(NOTIFICATION_EVENT, onChange)
            // same as channels.notification(onChange)
            return () => {
                channels.stopListening(NOTIFICATION_EVENT)
            }
        }
    }, [channels, onChange])
}

export function Notifications({ authUserId }) {
    const [notifications, setNotifications] = useState([])
    const handleNotificationsEvent = useCallback((notification) => {
        setNotifications(
            existingNotifications => ([notification].concat(existingNotifications))
        )
    })
    useNotificationChannel(authUserId, handleNotificationsEvent)
    return <ol>
        {notifications.map(n => <li key={n.id}>{n.content}</li>)}
    </ol>
}

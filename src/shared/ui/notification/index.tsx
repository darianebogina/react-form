import {useFormContext, useWatch, Controller} from "react-hook-form";
import type {RegistrationForm} from '../../schemas';
import {useEffect, useState} from "react";

export const NotificationSettings = () => {
    const {control} = useFormContext<RegistrationForm>();
    const [showNotification, setShowNotification] = useState(false);

    const notifications = useWatch({
        control,
        name: "notifications",
        // defaultValue: {email: false, push: true, sms: false},
    });

    const allDisabled = !notifications?.email && !notifications?.push && !notifications?.sms;
    const allEnabled = notifications?.email && notifications?.push && notifications?.sms;

    useEffect(() => {
        if (allDisabled && showNotification) {
            setShowNotification(false);
            alert('All notifications are disabled. You may miss important updates.');
            return;
        }
        if (allEnabled && showNotification) {
            setShowNotification(false);
            alert('All notifications are enabled. You will receive updates via all channels.');
            return;
        }
        setShowNotification(true);
    }, [allDisabled, allEnabled]);

    return (
        <fieldset>
            <legend>Notification settings</legend>

            <Controller
                name="notifications.email"
                control={control}
                render={({field}) => (
                    <label>
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                        />
                        Email notifications
                    </label>
                )}
            />

            <Controller
                name="notifications.push"
                control={control}
                render={({field}) => (
                    <label>
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                        />
                        Push notifications
                    </label>
                )}
            />

            <Controller
                name="notifications.sms"
                control={control}
                render={({field}) => (
                    <label>
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                        />
                        SMS notifications
                    </label>
                )}
            />
        </fieldset>
    );
};
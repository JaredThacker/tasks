import React, { useState } from "react";
import { Button } from "react-bootstrap";

enum Holiday {
    Christmas = "Christmas",
    Halloween = "Halloween",
    Thanksgiving = "Thanksgiving",
    NewYears = "NewYears",
    Valentines = "Valentines",
}

type HolidayEmojis = "🎄" | "🎃" | "🦃" | "🎆" | "💘";

const HolidayRecord: Record<HolidayEmojis, Holiday> = {
    "🎄": Holiday.Christmas,
    "🎃": Holiday.Halloween,
    "🦃": Holiday.Thanksgiving,
    "🎆": Holiday.NewYears,
    "💘": Holiday.Valentines,
};

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<Holiday>(Holiday.NewYears);

    function alphabetical(): void {
        if (holiday === HolidayRecord["🎄"]) {
            setHoliday(HolidayRecord["🎃"]);
            return;
        } else if (holiday === HolidayRecord["🎃"]) {
            setHoliday(HolidayRecord["🎆"]);
            return;
        } else if (holiday === HolidayRecord["🎆"]) {
            setHoliday(HolidayRecord["🦃"]);
            return;
        } else if (holiday === HolidayRecord["🦃"]) {
            setHoliday(HolidayRecord["💘"]);
            return;
        } else if (holiday === HolidayRecord["💘"]) {
            setHoliday(HolidayRecord["🎄"]);
            return;
        }
    }

    function byDate(): void {
        if (holiday === HolidayRecord["🎄"]) {
            setHoliday(HolidayRecord["🎆"]);
            return;
        } else if (holiday === HolidayRecord["🎆"]) {
            setHoliday(HolidayRecord["💘"]);
            return;
        } else if (holiday === HolidayRecord["💘"]) {
            setHoliday(HolidayRecord["🎃"]);
            return;
        } else if (holiday === HolidayRecord["🎃"]) {
            setHoliday(HolidayRecord["🦃"]);
            return;
        } else if (holiday === HolidayRecord["🦃"]) {
            setHoliday(HolidayRecord["🎄"]);
            return;
        }
    }

    return (
        <>
            <Button
                onClick={() => {
                    alphabetical();
                }}
            >
                Advance by Alphabet
            </Button>
            <Button
                onClick={() => {
                    byDate();
                }}
            >
                Advance By Year
            </Button>
            <span>Holiday: {holiday}</span>
        </>
    );
}

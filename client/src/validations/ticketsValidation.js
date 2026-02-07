import React from 'react'

export const ticketsValidation = ({ title, description, priority }) => {
    if (!title || !description || !priority) {
        return { ok: false, message: "All fileds are required" }
    }

    if (!title.trim()) {
        return { ok: false, message: "title is required" }
    }

    if (!description.trim()) {
        return { ok: false, message: "description is required" }
    }

    if (title.length < 5) {
        return { ok: false, message: "title must be at least 5 characters" }
    }

    if (description.length < 10) {
        return { ok: false, message: "description must be at least 10 characters" }
    }
    return {ok: true}
}
'use client'

import { DisqusSectionProps } from "@/types"
import { DiscussionEmbed } from "disqus-react"

function DisqusComments (props: DisqusSectionProps) {
    const disqusShortname = "cems-2"
    const disqusConfig = {
        url: "",
        identifier: props.event._id, // Single post id
        title: props.event.title // Single post title
    }
    return (
        <>
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </>
    )
}

export default DisqusComments
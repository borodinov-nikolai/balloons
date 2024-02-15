import Image from "next/image"
import styles from "./Videos.module.scss"
import { useEffect, useState } from "react"
import { API } from "lib/api"
import { VideoType } from "types/general"

import { getMediaUrl } from "lib/media"
import useWindowSize from "hooks/size.hooks"

function Videos() {
  const size = useWindowSize()

  const [videos, setVideos] = useState<VideoType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const numberVideo = size.width < 768 ? 2 : 3

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const {
          data: { data },
        } = await API.get("/videos", {
          params: {
            populate: "*",
          },
        })

        setVideos(data)
        setError("")
      } catch (e) {
        setError("Что-то пошло не так, перезагрузите страницу")
      }
      setLoading(false)
    }

    fetchArticles()
  }, [])

  return (
    videos &&
    videos.length !== 0 && (
      <div className="content">
        <div className={styles.videos}>
          {videos.slice(0, numberVideo).map(
            (vid: VideoType) =>
              vid.isView && (
                <div className={styles.video__container} key={vid.id}>
                  <div className={styles.video}>
                    {/* @ts-ignore */}
                    {vid.preview.data !== null ? (
                      <a href={vid?.link}>
                        <Image
                          src={getMediaUrl(vid.preview)}
                          fill
                          alt={vid.title}
                          className={styles.video__preview}
                        />
                      </a>
                    ) : (
                      <iframe
                        width="100%"
                        height="100%"
                        src={vid?.link}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>

                  <h4>{vid.title}</h4>
                </div>
              )
          )}
        </div>
      </div>
    )
  )
}

export default Videos

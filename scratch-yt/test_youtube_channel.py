# scratch-yt/test_youtube_channel.py
import unittest
from unittest.mock import MagicMock

from youtube_channel import check_status, hot_dog_ratio, search_videos


class TestHotDogRatio(unittest.TestCase):
    def test_normal_ratio(self):
        self.assertEqual(hot_dog_ratio(1_800_000, 46_000), 1_800_000 / 46_000)

    def test_zero_subscribers_returns_zero(self):
        self.assertEqual(hot_dog_ratio(1000, 0), 0.0)


class TestSearchVideos(unittest.TestCase):
    def test_maps_views_and_subscribers_to_ratio(self):
        youtube = MagicMock()
        youtube.search.return_value.list.return_value.execute.return_value = {
            "items": [
                {
                    "id": {"videoId": "vid1"},
                    "snippet": {"title": "Highest Paying Trades Jobs", "channelId": "ch1"},
                }
            ]
        }
        youtube.videos.return_value.list.return_value.execute.return_value = {
            "items": [{"id": "vid1", "statistics": {"viewCount": "1800000"}}]
        }
        youtube.channels.return_value.list.return_value.execute.return_value = {
            "items": [{"id": "ch1", "statistics": {"subscriberCount": "46000"}}]
        }

        results = search_videos(youtube, "highest paying trades jobs")

        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["views"], 1_800_000)
        self.assertEqual(results[0]["subscribers"], 46_000)
        self.assertAlmostEqual(results[0]["ratio"], 1_800_000 / 46_000)

    def test_no_results_returns_empty_list(self):
        youtube = MagicMock()
        youtube.search.return_value.list.return_value.execute.return_value = {"items": []}

        self.assertEqual(search_videos(youtube, "nonexistent query xyz"), [])


class TestCheckStatus(unittest.TestCase):
    def _mock_youtube(self, snippet, image, sections):
        youtube = MagicMock()
        youtube.channels.return_value.list.return_value.execute.return_value = {
            "items": [
                {
                    "id": "UC123",
                    "brandingSettings": {"channel": snippet, "image": image},
                }
            ]
        }
        youtube.channelSections.return_value.list.return_value.execute.return_value = {
            "items": sections
        }
        return youtube

    def test_fully_configured_channel_is_ok(self):
        youtube = self._mock_youtube(
            snippet={
                "description": "Longevidad sin excusas.",
                "keywords": "longevidad salud habitos",
                "unsubscribedTrailer": "trailerVideoId",
            },
            image={"bannerExternalUrl": "https://example.com/banner.png"},
            sections=[{"id": "s1"}],
        )

        result = check_status(youtube)

        self.assertEqual(result, {"ok": True, "missing": []})

    def test_empty_channel_reports_all_missing(self):
        youtube = self._mock_youtube(snippet={}, image={}, sections=[])

        result = check_status(youtube)

        self.assertFalse(result["ok"])
        self.assertEqual(
            set(result["missing"]),
            {
                "about/description",
                "channel keywords",
                "trailer for non-subscribers",
                "channel sections",
                "banner",
            },
        )




from youtube_channel import update_channel_branding, upsert_playlist, upsert_section


class TestUpdateChannelBranding(unittest.TestCase):
    def test_merges_new_fields_without_clobbering_existing(self):
        youtube = MagicMock()
        youtube.channels.return_value.list.return_value.execute.return_value = {
            "items": [
                {
                    "id": "UC123",
                    "brandingSettings": {
                        "channel": {"description": "old about", "keywords": "old kw"}
                    },
                }
            ]
        }
        youtube.channels.return_value.update.return_value.execute.return_value = {"id": "UC123"}

        update_channel_branding(youtube, about="new about")

        call_kwargs = youtube.channels.return_value.update.call_args.kwargs
        sent_channel = call_kwargs["body"]["brandingSettings"]["channel"]
        self.assertEqual(sent_channel["description"], "new about")
        self.assertEqual(sent_channel["keywords"], "old kw")


class TestUpsertPlaylist(unittest.TestCase):
    def test_insert_when_no_playlist_id(self):
        youtube = MagicMock()

        upsert_playlist(youtube, "Sueño y longevidad")

        youtube.playlists.return_value.insert.assert_called_once()
        youtube.playlists.return_value.update.assert_not_called()

    def test_update_when_playlist_id_given(self):
        youtube = MagicMock()

        upsert_playlist(youtube, "Sueño y longevidad", playlist_id="PL123")

        youtube.playlists.return_value.update.assert_called_once()
        sent_body = youtube.playlists.return_value.update.call_args.kwargs["body"]
        self.assertEqual(sent_body["id"], "PL123")


class TestUpsertSection(unittest.TestCase):
    def test_insert_includes_playlist_ids(self):
        youtube = MagicMock()

        upsert_section(youtube, "horizontalRow", "multiplePlaylists", title="Empieza aquí", playlist_ids=["PL1", "PL2"])

        youtube.channelSections.return_value.insert.assert_called_once()
        sent_body = youtube.channelSections.return_value.insert.call_args.kwargs["body"]
        self.assertEqual(sent_body["contentDetails"]["playlists"], ["PL1", "PL2"])
        self.assertEqual(sent_body["snippet"]["title"], "Empieza aquí")


if __name__ == "__main__":
    unittest.main()

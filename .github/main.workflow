workflow "New workflow" {
  on = "release"
  resolves = ["publish_chrome_store"]
}

action "publish_chrome_store" {
  uses = "create_zip"
  secrets = ["CHROME_CLIENT_ID", "CHROME_CLIENT_SECRET", "CHROME_REFRESH_TOKEN"]
}

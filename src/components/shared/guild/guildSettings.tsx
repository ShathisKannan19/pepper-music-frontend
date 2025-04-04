import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GuildData } from "@/types";
import { Crown } from "lucide-react";
const GuildSettings = ({ guildData }: { guildData: GuildData }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-black border-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Bot Settings</CardTitle>
              <CardDescription className="text-zinc-400">
                Configure general bot settings for this server
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-zinc-800 rounded-md">
                  <h3 className="font-medium mb-2">Command Prefix</h3>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-1 p-2 bg-black border border-zinc-700 rounded-l-md text-white focus:outline-none focus:ring-1 focus:ring-white"
                      defaultValue="/"
                    />
                    <Button className="bg-white text-black hover:bg-zinc-200 rounded-l-none">
                      Save
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-zinc-800 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">DJ Mode</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
                    </label>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Only users with DJ roles can control music playback
                  </p>
                </div>

                <div className="p-4 bg-zinc-800 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Song Announcements</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
                    </label>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Announce new songs in the text channel when they start
                    playing
                  </p>
                </div>
              </div>

              <Button className="bg-white text-black hover:bg-zinc-200 mt-4">
                Save All Changes
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-black border-zinc-800 text-white mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                Premium Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Higher audio quality",
                  "Unlimited playlists",
                  "Custom bot branding",
                  "24/7 playback mode",
                  "Unlimited DJ roles",
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <div className="w-4 h-4 mr-2 text-zinc-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:opacity-90">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black border-zinc-800 text-white">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                >
                  Reset Bot Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-800 text-red-500 hover:bg-red-900 hover:text-white"
                >
                  Remove Bot from Server
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuildSettings;

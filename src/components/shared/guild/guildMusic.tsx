import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GuildData } from "@/types";
import { Filter, List, Play, Volume2 } from "lucide-react";
const GuildMusic = ({ guildData }: { guildData: GuildData }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-black border-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Music Configuration</CardTitle>
              <CardDescription className="text-zinc-400">
                Customize how the music bot behaves in your server
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-800 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Volume2 className="w-4 h-4 mr-2 text-zinc-400" />
                      <span className="font-medium">Default Volume</span>
                    </div>
                    <span className="text-sm text-zinc-400">70%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                <div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-2 text-zinc-400" />
                    <span className="font-medium">Auto-Play</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>

                <div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <List className="w-4 h-4 mr-2 text-zinc-400" />
                    <span className="font-medium">Song Request Channel</span>
                  </div>
                  <Button
                    variant="outline"
                    className="h-8 px-3 bg-zinc-700 border-0 text-zinc-300 hover:bg-zinc-600"
                  >
                    #music
                  </Button>
                </div>

                <div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-zinc-400" />
                    <span className="font-medium">Filter Explicit Content</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>
              </div>

              <Button className="bg-white text-black hover:bg-zinc-200 mt-4">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-black border-zinc-800 text-white sticky top-6">
            <CardHeader>
              <CardTitle>Commands</CardTitle>
              <CardDescription className="text-zinc-400">
                Music control commands
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { cmd: "/play", desc: "Play a song" },
                { cmd: "/skip", desc: "Skip current song" },
                { cmd: "/pause", desc: "Pause playback" },
                { cmd: "/resume", desc: "Resume playback" },
                { cmd: "/stop", desc: "Stop playback" },
                { cmd: "/queue", desc: "Show current queue" },
                { cmd: "/shuffle", desc: "Shuffle the queue" },
              ].map((cmd) => (
                <div key={cmd.cmd} className="p-2 bg-zinc-800 rounded-md">
                  <code className="font-mono text-green-400">{cmd.cmd}</code>
                  <p className="text-sm text-zinc-400 mt-1">{cmd.desc}</p>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
              >
                View All Commands
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuildMusic;

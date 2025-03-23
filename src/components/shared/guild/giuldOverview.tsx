import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListMusic, Music, PlusCircle, Users } from "lucide-react";
import { GuildData } from "@/types";

const Overview = ({ guildData }: { guildData: GuildData }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="bg-black border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Bot Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xl font-bold">Online</span>
            </div>
            <p className="text-zinc-400 text-sm mt-1">Last active: Just now</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Music Commands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">35</p>
            <p className="text-zinc-400 text-sm">Commands used today</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Songs Played
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">128</p>
            <p className="text-zinc-400 text-sm">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black border-zinc-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ListMusic className="w-5 h-5 mr-2" />
              Recent Tracks
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Recently played music in your server
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center p-2 hover:bg-zinc-800 rounded-md transition-colors"
                >
                  <div className="w-10 h-10 bg-zinc-800 rounded-md flex items-center justify-center mr-3">
                    <Music className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      Song Title Example {i}
                    </p>
                    <p className="text-zinc-400 text-sm truncate">
                      Artist Name
                    </p>
                  </div>
                  <div className="text-zinc-500 text-sm">3:45</div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-zinc-900 border-zinc-900 text-white hover:bg-black hover:text-white cursor-pointer"
            >
              View All History
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black border-zinc-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              DJ Roles
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Roles that can control the music bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {guildData.roles
                .slice(0, 4)
                .filter((role) => role.position > 0)
                .map((role) => (
                  <div
                    key={role.id}
                    className="flex items-center p-2 hover:bg-zinc-800 rounded-md transition-colors"
                  >
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{
                        backgroundColor: role.color
                          ? `#${role.color.toString(16).padStart(6, "0")}`
                          : "#ffffff",
                      }}
                    ></div>
                    <span className="flex-1">{role.name}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
                    </label>
                  </div>
                ))}
            </div>
            <Button className="w-full mt-4 bg-white text-black hover:bg-zinc-200">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add DJ Role
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;

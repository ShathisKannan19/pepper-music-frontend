import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GuildData } from "@/types";
import { Badge } from "lucide-react";
const GuildPermission = ({ guildData }: { guildData: GuildData }) => {
  return (
    <div>
      <Card className="bg-black border-zinc-800 text-white">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription className="text-zinc-400">
            Configure which roles can use music bot features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                name: "Play Music",
                desc: "Start playing music in voice channels",
              },
              {
                name: "Skip Tracks",
                desc: "Skip the currently playing track",
              },
              {
                name: "Manage Queue",
                desc: "Add, remove, or rearrange songs in the queue",
              },
              { name: "Control Volume", desc: "Adjust music volume" },
            ].map((perm) => (
              <div
                key={perm.name}
                className="border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-medium">{perm.name}</h3>
                    <p className="text-sm text-zinc-400">{perm.desc}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="h-8 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                  >
                    Configure
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {guildData.roles
                    .slice(0, 3)
                    .filter((role) => role.position > 0 && !role.tags?.bot_id)
                    .map((role) => (
                      <Badge
                        key={role.id}
                        className="bg-zinc-800 border border-zinc-700 flex items-center gap-1"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: role.color
                              ? `#${role.color.toString(16).padStart(6, "0")}`
                              : "#ffffff",
                          }}
                        ></div>
                        {role.name}
                      </Badge>
                    ))}
                  <Badge className="bg-zinc-800 border border-zinc-700">
                    + 3 more
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuildPermission;

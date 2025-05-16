<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\Models\Product;
use App\Models\User;

class ProductDeleteResponseInAdmin implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Product $product, public User $user)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        \Log::info("Broadcasting on channel: product.{$this->user->id}");
        return [
            new PrivateChannel("product.{$this->user->id}"),
        ];
    }

    public function broadcastWith(): array
{
    return [
        'product' => $this->product->only(['id', 'name', 'price']), // or toArray()
        'user' => $this->user->only(['id', 'name']),
    ];
}

    // public function broadcastWith(): array
    // {
    //     return [
    //         'product' => $this->product->toArray(),
    //         'user' => $this->user->toArray(),
    //     ];
    // }
}
